using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Charts;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.DTOs.Preventives;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;
using ControleTiAPI.Models.Preventives;
using Microsoft.AspNetCore.Razor.Language.Extensions;
using Microsoft.Identity.Client;
using System.Security.Cryptography.Xml;

namespace ControleTiAPI.Services
{
    public class ComputerService : IComputerService
    {
        private readonly DataContext _context;
        private readonly IProcessingUnitService _processingUnitService;
        private readonly IStorageService _storageService;
        private readonly IMemoryService _memoryService;
        private readonly IProfileService _profileService;

        public ComputerService(
            DataContext context,
            IProcessingUnitService processingUnitService,
            IStorageService storageService,
            IMemoryService memoryService,
            IProfileService profileService
        )
        {
            _context = context;
            _processingUnitService = processingUnitService;
            _storageService = storageService;
            _memoryService = memoryService;
            _profileService = profileService;
        }

        public async Task<List<Computer>> GetPaginated(IQueryable<Computer> queryable, PaginationDTO paginate)
        {
            var computers = await queryable
                .Include(c => c.department)
                .Include(c => c.employee)
                .Include(c => c.profile)
                .Include(c => c.processingUnit)
                .Include(c => c.memories).ThenInclude(m => m.memory)
                .Include(c => c.storage)
                .OrderBy(c => c.code)
                .AsNoTracking()
                .Paginate(paginate).ToListAsync();

            return computers;
        }

        public async Task<Computer?> GetDeviceById(int id)
        {
            try
            {
                var computer = await _context.computer
                .Include(c => c.processingUnit)
                .Include(c => c.memories).ThenInclude(m => m.memory)
                .Include(c => c.storage)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.id == id);

                if (computer != null)
                {
                    var logs = await _context.computerLog.OrderByDescending(l => l.updatedAt).Where(l => l.computerId == computer.id).ToListAsync();
                    computer.setLogs(logs);
                }

                return computer;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro em Select por ID > " + ex.Message);
            }
        }

        public async Task<ChartComputerDTO> GetChartComputer(IQueryable<Computer> computers)
        {
            var chart = new ChartComputerDTO();

            computers = computers.Where(c => c.status == (int)StatusEnum.active);

            chart.memory.name = "Memória";
            chart.memory.desc = "Computadores com a memória defasada";

            chart.memory.computers = await computers.Where(c => c.memorySize < c.profile.memoryMinSize).Select(c => c.code).AsNoTracking().ToListAsync();
            chart.memory.qtde = await computers.AsNoTracking().CountAsync(c => c.memorySize < c.profile.memoryMinSize);

            chart.type.name = "Armazen.";
            chart.type.desc = "Computadores sem SSD";

            chart.type.computers = await computers.Where(c => c.profile.storageType == "SSD" && c.storage.type != "SSD").Select(c => c.code).AsNoTracking().ToListAsync();
            chart.type.qtde = await computers.AsNoTracking().CountAsync(c => c.profile.storageType == "SSD" && c.storage.type != "SSD");

            chart.storageSize.name = "Tamanho de Armaz.";
            chart.storageSize.desc = "Computadores com pouco armazenamento";

            chart.storageSize.computers = await computers.Where(c => c.storage.storageSize < c.profile.storageMinSize).Select(c => c.code).AsNoTracking().ToListAsync();
            chart.storageSize.qtde = await computers.AsNoTracking().CountAsync(c => c.storage.storageSize < c.profile.storageMinSize);

            chart.SO.name = "SO";
            chart.SO.desc = "Computadores com Sistema Operacional ultrapassado";

            chart.SO.computers = await computers.Where(c => c.rankOperationalSystem < c.profile.rankOfOperationSystem).Select(c => c.code).AsNoTracking().ToListAsync();
            chart.SO.qtde = await computers.AsNoTracking().CountAsync(c => c.rankOperationalSystem < c.profile.rankOfOperationSystem);

            chart.processor.name = "Processador";
            chart.processor.desc = "Computadores com processadores abaixo do necessário";

            chart.processor.computers = await computers.Where(c => c.processingUnit.rankProcessingUnit < c.profile.rankOfProcessingUnit).Select(c => c.code).AsNoTracking().ToListAsync();
            chart.processor.qtde = await computers.AsNoTracking().CountAsync(c => c.processingUnit.rankProcessingUnit < c.profile.rankOfProcessingUnit);

            return chart;
        }

        public async Task<InfoComputerDTO> GetInfoComputer()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var countComputer = await _context.computer.AsQueryable().AsNoTracking().CountAsync(c => c.status == (int)StatusEnum.active);
            var countNotebook = await _context.computer.AsQueryable().AsNoTracking().CountAsync(c => c.computerType == (int)ComputerTypeEnum.notebook);
            var countPreventives = await _context.computer.AsQueryable().AsNoTracking().CountAsync(c => c.status == (int)StatusEnum.active && (c.lastPreventiveDate == null || c.lastPreventiveDate < yearAgo));
            var countIsNotGood = await _context.computer.AsQueryable().AsNoTracking().CountAsync(c => !c.isGood && c.status == (int)StatusEnum.active);

            return new InfoComputerDTO(countComputer, countNotebook, countPreventives, countIsNotGood);
        }

        public async Task<FilterGetComputerDTO> FilterGetComputer()
        {
            var profiles = await _context.profile.OrderBy(p => p.name).AsNoTracking().AsNoTracking().ToListAsync();

            return new FilterGetComputerDTO(profiles);
        }

        public IQueryable<Computer> GetFilterComputer(FilterDTO<ComputerFilterDTO> filter)
        {
            var computerQueryable = _context.computer.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var s = searchDto.search.ToLower();

                computerQueryable = searchDto.attributte switch
                {
                    "code" => computerQueryable.Where(c => c.code.ToLower().Contains(s)),
                    "storage" => computerQueryable.Where(c => c.storage.brand.ToLower().Contains(s)),
                    "processor" => computerQueryable.Where(c => c.processingUnit.model.ToLower().Contains(s)),
                    "department" => computerQueryable.Where(c => c.department != null && c.department.description.ToLower().Contains(s)),
                    "enterprise" => computerQueryable.Where(c => c.department != null && c.department.enterprise.ToLower().Contains(s)),
                    "employee" => computerQueryable.Where(c => c.employee != null && c.employee.displayName.ToLower().Contains(s)),
                    "memory" => computerQueryable.Where(c => c.memories.Where(ms => ms.memory.model.ToLower().Contains(s)).Any()),
                    "operationalsystem" => computerQueryable.Where(c => c.operationalSystem.ToLower().Contains(s)),
                    "assetnumber" => computerQueryable.Where(c => c.assetNumber != null && c.assetNumber.ToLower().Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                if (filter.extra.classification != (int)ComputerClassificationEnum.all)
                {
                    int cClassification = filter.extra.classification;
                    computerQueryable = computerQueryable.Where(c =>
                        cClassification == (int)ComputerClassificationEnum.isGood ? c.isGood : !c.isGood
                    );
                }

                if (filter.extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    computerQueryable = computerQueryable.Where(c => c.status == filter.extra.statusFilter);
                }

                if (filter.extra.computerTypeFilter != (int)ComputerTypeFilterEnum.all)
                {
                    computerQueryable = computerQueryable.Where(c => c.computerType == filter.extra.computerTypeFilter);
                }

                if (filter.extra.profileFilter > 0)
                {
                    computerQueryable = computerQueryable.Where(c => c.profileId == filter.extra.profileFilter);
                }

                if (filter.extra.storageTypeFilter != "ALL")
                {
                    computerQueryable = computerQueryable.Where(c => c.storage.type == filter.extra.storageTypeFilter);
                }

                if (filter.extra.fromStorageSize != null)
                {
                    computerQueryable = computerQueryable.Where(c => c.storage.storageSize >= filter.extra.fromStorageSize);
                }

                if (filter.extra.toStorageSize != null && (filter.extra.fromStorageSize == null || filter.extra.toStorageSize >= filter.extra.fromStorageSize))
                {
                    computerQueryable = computerQueryable.Where(c => c.storage.storageSize <= filter.extra.toStorageSize);
                }

                if (filter.extra.fromMemorySize != null)
                {
                    computerQueryable = computerQueryable.Where(c => c.memorySize >= filter.extra.fromMemorySize);
                }

                if (filter.extra.toMemorySize != null && (filter.extra.fromMemorySize == null || filter.extra.toMemorySize >= filter.extra.fromMemorySize))
                {
                    computerQueryable = computerQueryable.Where(c => c.memorySize <= filter.extra.toMemorySize);
                }

                if (filter.extra.fromLastPreventive != null)
                {
                    computerQueryable = computerQueryable.Where(c => c.lastPreventiveDate >= filter.extra.fromLastPreventive);
                }

                if (filter.extra.toLastPreventive != null && (filter.extra.fromLastPreventive == null || filter.extra.toLastPreventive >= filter.extra.fromLastPreventive))
                {
                    computerQueryable = computerQueryable.Where(c => c.lastPreventiveDate <= filter.extra.toLastPreventive);
                } 
            }

            return computerQueryable;
        }
        public async Task<FormGetComputerDTO> FormGetComputer()
        {
            var departments = await _context.department.OrderBy(d => d.description).ThenBy(d => d.enterprise).ToListAsync();
            var employees = await _context.employee.OrderBy(e => e.name).ToListAsync();
            var profiles = await _context.profile.OrderBy(p => p.name).ToListAsync();
            var processingUnits = await _context.processingUnit.ToListAsync();
            var storages = await _context.storage.ToListAsync();

            return new FormGetComputerDTO(departments, employees, profiles, processingUnits, storages);
        }

        private async Task VerifyComputerRelashions(Computer computer)
        {
            try
            {
                var profile = await _profileService.GetDeviceById(computer.profileId);

                if (profile == null) throw new Exception("Perfil de uso não existe.");

                computer.profile = profile;

                if (computer.processingUnit != null)
                {
                    var processor = await _processingUnitService.CheckOrAddProcessor(computer.processingUnit);
                    computer.processorId = processor.id;
                    computer.processingUnit = processor;
                }

                if (computer.memories != null)
                {
                    foreach (var computerMemory in computer.memories)
                    {
                        var memory = await _memoryService.CheckOrAddMemory(computerMemory.memory);
                        computerMemory.memoryId = memory.id;
                        computerMemory.memory = memory;
                    }
                }

                if (computer.storage != null)
                {
                    var storage = await _storageService.CheckOrAddStorage(computer.storage);
                    computer.storageId = storage.id;
                    computer.storage = storage;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na verificação das relações: " + ex.Message);
            }
        }

        public async Task AddComputerLog(Computer computer)
        {
            ComputerLog log = new ComputerLog();

            try
            {
                var department = await _context.department.FirstOrDefaultAsync(d => d.id == computer.departmentId);
                var employee = await _context.employee.FirstOrDefaultAsync(d => d.id == computer.employeeId);

                log.computerId = computer.id;
                log.computer = computer;

                log.code = computer.code;
                log.department = department != null ? department.description : "";
                log.enterprise = department != null ? department.enterprise : "";
                log.employee = employee != null ? employee.displayName : "";
                log.computerProfile = computer.profile.name;
                log.operationalSystem = computer.operationalSystem;
                log.processingUnit = computer.processingUnit.model + " " + computer.processingUnit.generation + " " + computer.processingUnit.frequency;
                log.memorySize = computer.memorySize;
                log.storageSize = computer.storage.storageSize;

                log.storageType = computer.storage.type;

                log.status = computer.status;
                log.isGood = computer.isGood;
                log.updatedAt = DateTime.Now;

                await _context.computerLog.AddAsync(log);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao incluir o log do computador: " + ex.Message);
            }
        }

        private async Task UpdateReport()
        {
            var newComputerReport = new ComputersReport();
            newComputerReport.reportDate = DateTime.Now;

            var countIsGood = await _context.computer.AsNoTracking().CountAsync(c => c.isGood);
            var countIsNotGood = await _context.computer.AsNoTracking().CountAsync(c => !c.isGood);

            newComputerReport.countComputerIsGood = countIsGood;
            newComputerReport.countComputerIsNotGood = countIsNotGood;

            await _context.computerReport.AddAsync(newComputerReport);
            await _context.SaveChangesAsync();
        }

        public async Task AddDevice(Computer newComputer)
        {
            try
            {
                if (newComputer == null) throw new Exception("Entrada nula, inserção não é válida.");

                var existComputer = await _context.computer.FirstOrDefaultAsync(c => c.code == newComputer.code);

                if (existComputer != null) throw new Exception("Já existe um computador com este código");

                await VerifyComputerRelashions(newComputer);

                newComputer.setIsGood();
                newComputer.createdAt = DateTime.Now;

                await _context.computer.AddAsync(newComputer);
                await _context.SaveChangesAsync();

                await AddComputerLog(newComputer);

                // Add One Preventive
                if (newComputer.lastPreventiveDate != null)
                {
                    ComputerPreventive preventive = new ComputerPreventive(
                        null,
                        preventiveDate: newComputer.lastPreventiveDate.GetValueOrDefault(),
                        ticketId: newComputer.ticketId,
                        computerId: newComputer.id
                    );

                    await this.AddPreventive(preventive, newComputer);
                }

                // Update the number of IsGood
                await UpdateReport();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao Inserir o Computer: " + ex.Message);
            }
        }

        public async Task UpdateDevice(Computer upComputer)
        {
            try
            {
                if (upComputer == null) throw new Exception("Alteração nula.");

                var computer = await _context.computer
                    .Include(c => c.profile)
                    .Include(c => c.processingUnit)
                    .Include(c => c.memories).ThenInclude(m => m.memory)
                    .Include(c => c.storage)
                    .FirstOrDefaultAsync(c => c.id == upComputer.id);

                if (computer == null) throw new Exception("Computador não encontrado.");

                var existComputer = await _context.computer.FirstOrDefaultAsync(c => c.code == upComputer.code);

                if (existComputer != null && existComputer.id != computer.id) throw new Exception("Já existe um computador com este código");

                bool pastIsGood = computer.isGood;

                await VerifyComputerRelashions(upComputer);

                computer.code = upComputer.code;
                computer.computerType = upComputer.computerType;
                computer.memorySize = upComputer.memorySize;
                computer.operationalSystem = upComputer.operationalSystem;
                computer.rankOperationalSystem = upComputer.rankOperationalSystem;
                computer.status = upComputer.status;
                computer.assetNumber = upComputer.assetNumber;
                computer.acquisitionDate = upComputer.acquisitionDate;
                computer.lastPreventiveDate = upComputer.lastPreventiveDate;
                computer.ticketId = upComputer.ticketId;
                computer.notes = upComputer.notes;
                computer.departmentId = upComputer.departmentId;
                computer.employeeId = upComputer.employeeId;
                computer.profileId = upComputer.profileId;
                computer.processorId = upComputer.processorId;
                computer.storageId = upComputer.storageId;
                computer.profile = upComputer.profile;
                computer.processingUnit = upComputer.processingUnit;
                computer.memories = upComputer.memories;
                computer.storage = upComputer.storage;

                computer.setIsGood();

                await _context.SaveChangesAsync();

                await AddComputerLog(computer);

                var preventives = await _context.computerPreventive
                    .Where(p => p.computerId == computer.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();


                if (computer.lastPreventiveDate != null)
                {
                    if (preventives == null || preventives.Count == 0 || preventives[0].preventiveDate != computer.lastPreventiveDate)
                    {
                        ComputerPreventive preventive = new ComputerPreventive(
                            null,
                            preventiveDate: computer.lastPreventiveDate.GetValueOrDefault(),
                            ticketId: computer.ticketId,
                            computerId: computer.id
                        );

                        await this.AddPreventive(preventive, computer);
                    }
                    else
                    {
                        if (preventives[0].ticketId != computer.ticketId)
                        {
                            ComputerPreventive preventive = new ComputerPreventive(
                                preventives[0].id,
                                preventiveDate: computer.lastPreventiveDate.GetValueOrDefault(),
                                ticketId: computer.ticketId,
                                computerId: computer.id
                            );

                            await this.UpdatePreventive(preventive, computer);
                        }
                    }
                }
                else
                {
                    if (preventives != null && preventives.Count > 0)
                        await this.DeletePreventive(preventives[0].id, computer);
                }

                // If The new isGood is different from the pastIsGood so we need to update report with a new value
                if (pastIsGood != computer.isGood)
                {
                    await UpdateReport();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar o Computador: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var computer = await _context.computer.FirstOrDefaultAsync(c => c.id == id);

                if (computer == null) throw new Exception("Computador não encontrado.");

                _context.computer.Remove(computer);
                await _context.SaveChangesAsync();

                await UpdateReport();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover o Computador: " + ex.Message);
            }
        }


        /*** PREVENTIVES AREA ***/

        public async Task<PreventiveDeviceReportDTO> GetPreventiveReport()
        {
            var preventivesComputers = await _context.computer
                .Include(d => d.department)
                .Include(e => e.employee)
                .Where(c => c.status == (int)StatusEnum.active)
                .Select(c => new PreventiveDTO
                {
                    deviceCode = c.code,
                    deviceId = c.id,
                    department = c.department != null ? c.department.description : "",
                    enterprise = c.department != null ? c.department.enterprise : "",
                    employee = c.employee != null ? c.employee.displayName : "",
                    dueDate = PreventiveDTO.setDueDate(c.lastPreventiveDate, c.createdAt.GetValueOrDefault()),
                    lastPreventiveDate = c.lastPreventiveDate != null ? c.lastPreventiveDate : null,
                    ticketId = c.ticketId != null ? c.ticketId : "",
                    statusPreventive = PreventiveDTO.setStatusPreventive(c.lastPreventiveDate, c.createdAt.GetValueOrDefault())
                })
                .OrderBy(p => p.deviceCode)
                .AsNoTracking()
                .ToListAsync();

            int total = preventivesComputers.Count();
            int doneQtde = preventivesComputers.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.done);
            int overdueQtde = preventivesComputers.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.overdue);
            int todoQtde = preventivesComputers.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.todo);

            DateTime? forecast = preventivesComputers.Where(p => p.statusPreventive != (int)StatusPreventiveEnum.done).Max(p => p.dueDate);

            return new PreventiveDeviceReportDTO(preventivesComputers, total, doneQtde, overdueQtde, todoQtde, forecast);
        }

        public IQueryable<Computer> GetPreventivesTodo()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var prevTodoComputer = _context.computer.Where(c => c.status == (int)StatusEnum.active && (c.lastPreventiveDate == null || c.lastPreventiveDate < yearAgo));

            return prevTodoComputer;
        }

        public IQueryable<Computer> GetPreventivesDone()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var prevDoneComputer = _context.computer.Where(c => c.status == (int)StatusEnum.active && c.lastPreventiveDate >= yearAgo);

            return prevDoneComputer;
        }

        public IQueryable<Computer> GetPreventivesFiltered(IQueryable<Computer> queryable, ICollection<string> searches)
        {
            var filterQuery = queryable;

            foreach (var search in searches)
            {
                filterQuery = filterQuery.Where(c =>
                    c.code.Contains(search.ToLower()) ||
                    (c.employee != null && (c.employee.displayName.Contains(search.ToLower()) || c.employee.name.Contains(search.ToLower()))) ||
                    (c.department != null && (c.department.description.Contains(search.ToLower()) || c.department.enterprise.Contains(search.ToLower())))
                );
            }

            return filterQuery;
        }

        public async Task<List<Computer>> GetPaginatedPreventives(IQueryable<Computer> queryable, PaginationDTO paginate)
        {
            var preventivesComputer = await queryable
                                .Include(c => c.preventives)
                                .OrderByDescending(c => c.lastPreventiveDate)
                                .Select(c => new Computer { 
                                    id = c.id, 
                                    code = c.code, 
                                    employee = c.employee != null ? new Employee { displayName = c.employee.displayName } : null,
                                    department = c.department != null ? new Department { description = c.department.description, enterprise = c.department.enterprise } : null,
                                    lastPreventiveDate = c.lastPreventiveDate, 
                                    ticketId = c.ticketId, 
                                    createdAt = c.createdAt,
                                    preventives = c.preventives.OrderByDescending(p => p.preventiveDate).ToList() })
                                .AsNoTracking()
                                .Paginate(paginate).ToListAsync();

            return preventivesComputer;
        }

        public async Task AddPreventive(ComputerPreventive newPreventive)
        {
            try
            {
                var computer = await _context.computer.FirstOrDefaultAsync(c => c.id == newPreventive.computerId);
                if (computer == null) throw new Exception("Computador não existe");

                if (computer.lastPreventiveDate == null || computer.lastPreventiveDate < newPreventive.preventiveDate)
                {
                    computer.lastPreventiveDate = newPreventive.preventiveDate;
                    computer.ticketId = newPreventive.ticketId;
                }

                await _context.computerPreventive.AddAsync(newPreventive);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao adicionar a Preventiva ao Computador: " + ex.Message);
            }
        }

        // ADD Preventive Isomorfo
        public async Task AddPreventive(ComputerPreventive newPreventive, Computer computer)
        {
            try
            {
                if (computer.lastPreventiveDate == null || computer.lastPreventiveDate < newPreventive.preventiveDate)
                {
                    computer.lastPreventiveDate = newPreventive.preventiveDate;
                    computer.ticketId = newPreventive.ticketId;
                }

                await _context.computerPreventive.AddAsync(newPreventive);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao adicionar a Preventiva ao Computador: " + ex.Message);
            }
        }

        public async Task UpdatePreventive(ComputerPreventive upPreventive)
        {
            try
            {
                var computer = await _context.computer.FirstOrDefaultAsync(c => c.id == upPreventive.computerId);
                if (computer == null) throw new Exception("Computador não existe");

                var preventive = await _context.computerPreventive.FirstOrDefaultAsync(p => p.id == upPreventive.id);
                if (preventive == null) throw new Exception("Preventiva não existe");

                preventive.preventiveDate = upPreventive.preventiveDate;
                preventive.ticketId = upPreventive.ticketId;

                await _context.SaveChangesAsync();

                // Save the last preventive as the last preventive in the computer table

                var preventives = await _context.computerPreventive
                    .Where(p => p.computerId == computer.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    computer.lastPreventiveDate = preventives[0].preventiveDate;
                    computer.ticketId = preventives[0].ticketId;
                }
                else
                {
                    computer.lastPreventiveDate = null;
                    computer.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar a Preventiva ao Computador: " + ex.Message);
            }
        }

        // Update Computer Isomorfo
        public async Task UpdatePreventive(ComputerPreventive upPreventive, Computer computer)
        {
            try
            {
                var preventive = await _context.computerPreventive.FirstOrDefaultAsync(p => p.id == upPreventive.id);
                if (preventive == null) throw new Exception("Preventiva não existe");

                preventive.preventiveDate = upPreventive.preventiveDate;
                preventive.ticketId = upPreventive.ticketId;

                await _context.SaveChangesAsync();

                // Save the last preventive as the last preventive in the computer table

                var preventives = await _context.computerPreventive
                    .Where(p => p.computerId == computer.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    computer.lastPreventiveDate = preventives[0].preventiveDate;
                    computer.ticketId = preventives[0].ticketId;
                }
                else
                {
                    computer.lastPreventiveDate = null;
                    computer.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar a Preventiva ao Computador: " + ex.Message);
            }
        }

        public async Task DeletePreventive(int preventiveId, int computerId)
        {
            try
            {
                var computer = await _context.computer.FirstOrDefaultAsync(c => c.id == computerId);
                if (computer == null) throw new Exception("Computador não existe");

                var preventive = await _context.computerPreventive.FirstOrDefaultAsync(p => p.id == preventiveId);
                if (preventive == null) throw new Exception("Preventiva não existe");

                _context.computerPreventive.Remove(preventive);

                await _context.SaveChangesAsync();

                var preventives = await _context.computerPreventive
                    .Where(p => p.computerId == computer.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    computer.lastPreventiveDate = preventives[0].preventiveDate;
                    computer.ticketId = preventives[0].ticketId;
                } 
                else
                {
                    computer.lastPreventiveDate = null;
                    computer.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover a Preventiva do computador: " + ex.Message);
            }
        }

        // Delete Preventive Isomorfo
        public async Task DeletePreventive(int preventiveId, Computer computer)
        {
            try
            {
                var preventive = await _context.computerPreventive.FirstOrDefaultAsync(p => p.id == preventiveId);
                if (preventive == null) throw new Exception("Preventiva não existe");

                _context.computerPreventive.Remove(preventive);

                await _context.SaveChangesAsync();

                var preventives = await _context.computerPreventive
                    .Where(p => p.computerId == computer.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    computer.lastPreventiveDate = preventives[0].preventiveDate;
                    computer.ticketId = preventives[0].ticketId;
                }
                else
                {
                    computer.lastPreventiveDate = null;
                    computer.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover a Preventiva do computador: " + ex.Message);
            }
        }
    }
}
