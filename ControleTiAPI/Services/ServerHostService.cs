using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.DTOs.Preventives;
using ControleTiAPI.DTOs;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models.Preventives;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ControleTiAPI.Models;
using Microsoft.Extensions.Hosting;

namespace ControleTiAPI.Services
{
    public class ServerHostService : IServerHostService
    {
        private readonly DataContext _context;
        private readonly IMemoryService _memoryService;
        private readonly IStorageService _storageService;

        public ServerHostService(DataContext context, IMemoryService memoryService, IStorageService storageService)
        {
            _context = context;
            _memoryService = memoryService;
            _storageService = storageService;
        }

        public async Task<List<ServerHost>> GetPaginated(IQueryable<ServerHost> queryable, PaginationDTO paginate)
        {
            var servers = await queryable
                .Include(s => s.functionalities).ThenInclude(f => f.functionality)
                .Include(s => s.virtualMachines).ThenInclude(v => v.functionalities).ThenInclude(f => f.functionality)
                .Include(s => s.storages).ThenInclude(ss => ss.storage)
                .Include(s => s.memories).ThenInclude(sm => sm.memory)
                .OrderBy(s => s.code)
                .AsNoTracking()
                .Paginate(paginate).ToListAsync();

            return servers;
        }

        public async Task<InfoServerDTO> GetInfoServer()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var hosts = _context.serverHost.AsQueryable();
            var vms = _context.serverVM.AsQueryable();

            int hostQtde = await hosts.CountAsync(h => h.status == (int)StatusEnum.active);
            int preventivesTodo = await hosts.CountAsync(h => h.status == (int)StatusEnum.active && (h.lastPreventiveDate == null || h.lastPreventiveDate < yearAgo));
            int vmsQtde = await vms.CountAsync(v => v.status == (int)StatusEnum.active);
            int vmsSetupThisYear = await vms.CountAsync(v => v.status == (int)StatusEnum.active && v.setupDate != null && v.setupDate > yearAgo);

            return new InfoServerDTO(hostQtde, vmsQtde, preventivesTodo, vmsSetupThisYear);
        }

        public async Task<ServerHost?> GetDeviceById(int id)
        {
            try
            {
                var servers = await _context.serverHost
                    .Include(s => s.functionalities).ThenInclude(f => f.functionality)
                    .Include(s => s.virtualMachines)
                    .Include(s => s.storages).ThenInclude(ss => ss.storage)
                    .Include(s => s.memories).ThenInclude(sm => sm.memory)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(c => c.id == id);

                return servers;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro em Select Server por ID > " + ex.Message);
            }
        }

        public async Task<FilterGetHostDTO> GetFillServerHostFilter()
        {
            var funcs = await _context.serverFunctionality.Select(f => new ServerFunctionality { id = f.id, description = f.description }).OrderBy(f => f.description).AsNoTracking().ToListAsync();

            return new FilterGetHostDTO(funcs);
        }

        public IQueryable<ServerHost> GetFilterServer(FilterDTO<HostFilterDTO> filter)
        {
            var serverQueryable = _context.serverHost.AsQueryable();

            foreach (var ss in filter.searches)
            {
                var search = ss.search.ToLower();

                serverQueryable = ss.attributte switch
                {
                    "code" => serverQueryable.Where(s => s.code.Contains(search)),
                    "virtualmachine" => serverQueryable.Where(s => s.virtualMachines.Where(vm => vm.code.Contains(search)).Any()),
                    "model" => serverQueryable.Where(s => s.machineModel.Contains(search)),
                    "brand" => serverQueryable.Where(s => s.machineBrand.Contains(search)),
                    "processor" => serverQueryable.Where(s => s.processorModelDescription.Contains(search)),
                    "memory" => serverQueryable.Where(s => s.memories.Where(mm => mm.memory.model.Contains(search)).Any()),
                    "storage" => serverQueryable.Where(s => s.storages.Where(ss => ss.storage.brand.Contains(search)).Any()),
                    "operationalsystem" => serverQueryable.Where(s => s.operationalSystemDescription.Contains(search) || s.virtualMachines.Where(vm => vm.operationalSystem.Contains(search)).Any()),
                    "assetnumber" => serverQueryable.Where(s => s.assetNumber != null && s.assetNumber.Contains(search)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado.")
                };
            }

            if (filter.extra != null)
            {
                HostFilterDTO hext = filter.extra;

                if (hext.statusFilter != (int)StatusFilterEnum.all)
                {
                    serverQueryable = serverQueryable.Where(s => s.status == hext.statusFilter);
                }

                if (hext.hostFunctionality != 0)
                {
                    serverQueryable = serverQueryable.Where(s => s.functionalities.Where(f => f.functionalityId == hext.hostFunctionality).Any());
                }

                if (hext.vmFunctionality != 0)
                {
                    serverQueryable = serverQueryable.Where(s => s.virtualMachines.Where(vm => vm.functionalities.Where(f => f.functionalityId == hext.vmFunctionality).Any()).Any());
                }

                if (hext.fromStorageSize != null)
                {
                    serverQueryable = serverQueryable.Where(s => s.storageSize >= hext.fromStorageSize);
                }

                if (hext.toStorageSize != null && (hext.fromStorageSize == null || hext.toStorageSize >= hext.fromStorageSize))
                {
                    serverQueryable = serverQueryable.Where(s => s.storageSize <= hext.toStorageSize);
                }

                if (hext.fromMemorySize != null)
                {
                    serverQueryable = serverQueryable.Where(s => s.memorySize >= hext.fromMemorySize);
                }

                if (hext.toMemorySize != null && (hext.fromMemorySize == null || hext.toMemorySize >= hext.fromMemorySize))
                {
                    serverQueryable = serverQueryable.Where(s => s.memorySize <= hext.toMemorySize);
                }

                if (hext.fromAcquisitionDate != null)
                {
                    serverQueryable = serverQueryable.Where(s => s.acquisitionDate >= hext.fromAcquisitionDate);
                }

                if (hext.toAcquisitionDate != null && (hext.fromAcquisitionDate == null || hext.toAcquisitionDate >= hext.fromAcquisitionDate))
                {
                    serverQueryable = serverQueryable.Where(s => s.acquisitionDate <= hext.toAcquisitionDate);
                }

                if (hext.fromLastPreventive != null)
                {
                    serverQueryable = serverQueryable.Where(c => c.lastPreventiveDate >= hext.fromLastPreventive);
                }

                if (hext.toLastPreventive != null && (hext.fromLastPreventive == null || hext.toLastPreventive >= hext.fromLastPreventive))
                {
                    serverQueryable = serverQueryable.Where(c => c.lastPreventiveDate <= hext.toLastPreventive);
                }
            }

            return serverQueryable;
        }

        public async Task<FormGetServerHostDTO> GetFillServerHostForm()
        {
            var funcs = await _context.serverFunctionality.Select(f => new ServerFunctionality { id = f.id, description = f.description }).OrderBy(f => f.description).AsNoTracking().ToListAsync();

            return new FormGetServerHostDTO(funcs);
        }
        
        private async Task VerifyServerHostRelashions(ServerHost host)
        {
            try
            {
                if (host.functionalities != null)
                {
                    foreach (var functionality in host.functionalities)
                    {
                        var func = await _context.serverFunctionality.FirstOrDefaultAsync(f => f.id == functionality.functionalityId);

                        if (func == null) throw new Exception("Alguma das funcionalidades selecionadas não existe.");

                        functionality.functionalityId = func.id;
                        functionality.functionality = func;
                    }
                }

                if (host.memories != null)
                {
                    foreach (var computerMemory in host.memories)
                    {
                        var memory = await _memoryService.CheckOrAddMemory(computerMemory.memory);
                        computerMemory.memoryId = memory.id;
                        computerMemory.memory = memory;
                    }
                }

                if (host.storages != null)
                {
                    foreach (var serverStorage in host.storages)
                    {
                        var storage = await _storageService.CheckOrAddStorage(serverStorage.storage);
                        serverStorage.storageId = storage.id;
                        serverStorage.storage = storage;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na verificação das relações > " + ex.Message);
            }
        }


        public async Task AddDevice(ServerHost newHost)
        {
            try
            {
                if (newHost == null) throw new Exception("Entrada nula, inserção não é válida.");

                var existHost = await _context.serverHost.FirstOrDefaultAsync(sh => sh.code == newHost.code);

                if (existHost != null) throw new Exception("Já existe um servidor com este código");

                await VerifyServerHostRelashions(newHost);

                newHost.createdAt = DateTime.Now;
                newHost.updatedAt = DateTime.Now;

                await _context.serverHost.AddAsync(newHost);
                await _context.SaveChangesAsync();

                // Add One Preventive
                if (newHost.lastPreventiveDate != null)
                {
                    ServerPreventive preventive = new ServerPreventive(
                        id: null,
                        preventiveDate: newHost.lastPreventiveDate.GetValueOrDefault(),
                        ticketId: newHost.ticketId,
                        hostId: newHost.id
                    );

                    await this.AddPreventive(preventive, newHost);
                }

            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao Inserir o SRV HOST > " + ex.Message);
            }
        }

        public async Task UpdateDevice(ServerHost upHost)
        {
            try
            {
                if (upHost == null) throw new Exception("Alteração nula.");

                var host = await _context.serverHost
                    .Include(s => s.functionalities).ThenInclude(f => f.functionality)
                    .Include(s => s.storages).ThenInclude(ss => ss.storage)
                    .Include(s => s.memories).ThenInclude(sm => sm.memory)
                    .FirstOrDefaultAsync(s => s.id == upHost.id);

                if (host == null) throw new Exception("Host não encontrado.");

                var existHost = await _context.serverHost.FirstOrDefaultAsync(s => s.code == upHost.code);

                if (existHost != null && existHost.id != host.id) throw new Exception("Já existe um host com este código");


                await VerifyServerHostRelashions(upHost);

                host.code = upHost.code;
                host.machineBrand = upHost.machineBrand;
                host.machineModel = upHost.machineModel;
                host.storageSize = upHost.storageSize;
                host.memorySize = upHost.memorySize;
                host.processorModelDescription = upHost.processorModelDescription;
                host.processorFrequency = upHost.processorFrequency;
                host.operationalSystemDescription = upHost.operationalSystemDescription;

                host.lastPreventiveDate = upHost.lastPreventiveDate;
                host.ticketId = upHost.ticketId;
                host.acquisitionDate = upHost.acquisitionDate;
                host.status = upHost.status;
                host.assetNumber = upHost.assetNumber;
                host.notes = upHost.notes;

                host.memories = upHost.memories;
                host.storages = upHost.storages;
                host.functionalities = upHost.functionalities;

                host.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();

                var preventives = await _context.serverPreventive
                    .Where(p => p.hostId == host.id)
                    .OrderByDescending(p => p.preventiveDate).ThenByDescending(p => p.ticketId)
                    .Take(1)
                    .ToListAsync();

                if (host.lastPreventiveDate != null)
                {
                    if (preventives == null || preventives.Count == 0 || preventives[0].preventiveDate != host.lastPreventiveDate)
                    {
                        ServerPreventive preventive = new ServerPreventive(
                            id: null,
                            preventiveDate: host.lastPreventiveDate.GetValueOrDefault(),
                            ticketId: host.ticketId,
                            hostId: host.id
                        );

                        await this.AddPreventive(preventive, host);
                    }
                    else
                    {
                        if (preventives[0].ticketId != host.ticketId)
                        {
                            ServerPreventive preventive = new ServerPreventive(
                                id: preventives[0].id,
                                preventiveDate: host.lastPreventiveDate.GetValueOrDefault(),
                                ticketId: host.ticketId,
                                hostId: host.id
                            );

                            await this.UpdatePreventive(preventive, host);
                        }
                    }
                }
                else
                {
                    if (preventives != null && preventives.Count > 0)
                        await this.DeletePreventive(preventives[0].id, host);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar o SRV HOST > " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var host = await _context.serverHost.FirstOrDefaultAsync(s => s.id == id);

                if (host == null) throw new Exception("Srv Host não encontrado.");

                _context.serverHost.Remove(host);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover o SRV HOST > " + ex.Message);
            }
        }


        /*** PREVENTIVES AREA ***/

        public async Task<PreventiveDeviceReportDTO> GetPreventiveReport()
        {
            var preventivesServers = await _context.serverHost
                .Where(s => s.status == (int)StatusEnum.active)
                .Select(s => new PreventiveDTO
                {
                    deviceCode = s.code,
                    deviceId = s.id,
                    dueDate = PreventiveDTO.setDueDate(s.lastPreventiveDate, s.createdAt),
                    lastPreventiveDate = s.lastPreventiveDate != null ? s.lastPreventiveDate : null,
                    ticketId = s.ticketId != null ? s.ticketId : "",
                    statusPreventive = PreventiveDTO.setStatusPreventive(s.lastPreventiveDate, s.createdAt)
                })
                .OrderBy(p => p.deviceCode)
                .AsNoTracking()
                .ToListAsync();

            int total = preventivesServers.Count();
            int doneQtde = preventivesServers.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.done);
            int overdueQtde = preventivesServers.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.overdue);
            int todoQtde = preventivesServers.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.todo);

            return new PreventiveDeviceReportDTO(preventivesServers, total, doneQtde, overdueQtde, todoQtde, null);
        }

        public IQueryable<ServerHost> GetPreventivesTodo()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var prevTodoServers = _context.serverHost.Where(s => s.status == (int)StatusEnum.active && (s.lastPreventiveDate == null || s.lastPreventiveDate < yearAgo));
            return prevTodoServers;
        }

        public IQueryable<ServerHost> GetPreventivesDone()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var prevDoneHost = _context.serverHost.Where(s => s.status == (int)StatusEnum.active && s.lastPreventiveDate >= yearAgo);

            return prevDoneHost;
        }

        public IQueryable<ServerHost> GetPreventivesFiltered(IQueryable<ServerHost> queryable, ICollection<string> searches)
        {
            var filterQuery = queryable;

            foreach (var search in searches)
            {
                filterQuery = filterQuery.Where(s => s.code.Contains(search.ToLower()));
            }

            return filterQuery;
        }

        public async Task<List<ServerHost>> GetPaginatedPreventives(IQueryable<ServerHost> queryable, PaginationDTO paginate)
        {
            var preventivesHosts = await queryable
                .Include(s => s.preventives)
                .OrderByDescending(s => s.lastPreventiveDate)
                .Select(s => new ServerHost
                {
                    id = s.id,
                    code = s.code,
                    lastPreventiveDate = s.lastPreventiveDate,
                    ticketId = s.ticketId,
                    createdAt = s.createdAt,
                    preventives = s.preventives.OrderByDescending(p => p.preventiveDate).ToList()
                })
                .AsNoTracking()
                .Paginate(paginate).ToListAsync();

            return preventivesHosts;
        }

        public async Task AddPreventive(ServerPreventive newPreventive)
        {
            try
            {
                var host = await _context.serverHost.FirstOrDefaultAsync(c => c.id == newPreventive.hostId);
                if (host == null) throw new Exception("Srv Host não existe");

                if (host.lastPreventiveDate == null || host.lastPreventiveDate < newPreventive.preventiveDate)
                {
                    host.lastPreventiveDate = newPreventive.preventiveDate;
                    host.ticketId = newPreventive.ticketId;
                }

                await _context.serverPreventive.AddAsync(newPreventive);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao adicionar a Preventiva ao Servidor > " + ex.Message);
            }
        }

        // ADD Preventive Isomorfo
        public async Task AddPreventive(ServerPreventive newPreventive, ServerHost host)
        {
            try
            {
                if (host.lastPreventiveDate == null || host.lastPreventiveDate < newPreventive.preventiveDate)
                {
                    host.lastPreventiveDate = newPreventive.preventiveDate;
                    host.ticketId = newPreventive.ticketId;
                }

                await _context.serverPreventive.AddAsync(newPreventive);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao adicionar a Preventiva ao Servidor > " + ex.Message);
            }
        }

        public async Task UpdatePreventive(ServerPreventive upPreventive)
        {
            try
            {
                var host = await _context.serverHost.FirstOrDefaultAsync(s => s.id == upPreventive.hostId);
                if (host == null) throw new Exception("Servidor não existe");

                var preventive = await _context.serverPreventive.FirstOrDefaultAsync(p => p.id == upPreventive.id);
                if (preventive == null) throw new Exception("Preventiva não existe");

                preventive.preventiveDate = upPreventive.preventiveDate;
                preventive.ticketId = upPreventive.ticketId;

                await _context.SaveChangesAsync();

                // Save the last preventive as the last preventive in the computer table

                var preventives = await _context.serverPreventive
                    .Where(p => p.hostId == host.id)
                    .OrderByDescending(p => p.preventiveDate).ThenByDescending(p => p.ticketId)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    host.lastPreventiveDate = preventives[0].preventiveDate;
                    host.ticketId = preventives[0].ticketId;
                }
                else
                {
                    host.lastPreventiveDate = null;
                    host.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar a Preventiva ao Servidor > " + ex.Message);
            }
        }

        // Update Computer Isomorfo
        public async Task UpdatePreventive(ServerPreventive upPreventive, ServerHost host)
        {
            try
            {
                var preventive = await _context.serverPreventive.FirstOrDefaultAsync(p => p.id == upPreventive.id);
                if (preventive == null) throw new Exception("Preventiva não existe");

                preventive.preventiveDate = upPreventive.preventiveDate;
                preventive.ticketId = upPreventive.ticketId;

                await _context.SaveChangesAsync();

                // Save the last preventive as the last preventive in the computer table

                var preventives = await _context.serverPreventive
                    .Where(p => p.hostId == host.id)
                    .OrderByDescending(p => p.preventiveDate).ThenByDescending(p => p.ticketId)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    host.lastPreventiveDate = preventives[0].preventiveDate;
                    host.ticketId = preventives[0].ticketId;
                }
                else
                {
                    host.lastPreventiveDate = null;
                    host.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar a Preventiva ao Servidor > " + ex.Message);
            }
        }

        public async Task DeletePreventive(int preventiveId, int hostId)
        {
            try
            {
                var host = await _context.serverHost.FirstOrDefaultAsync(s => s.id == hostId);
                if (host == null) throw new Exception("Servidor não existe");

                var preventive = await _context.serverPreventive.FirstOrDefaultAsync(p => p.id == preventiveId);
                if (preventive == null) throw new Exception("Preventiva não existe");

                _context.serverPreventive.Remove(preventive);

                await _context.SaveChangesAsync();

                var preventives = await _context.serverPreventive
                    .Where(p => p.hostId == host.id)
                    .OrderByDescending(p => p.preventiveDate).ThenByDescending(p => p.ticketId)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    host.lastPreventiveDate = preventives[0].preventiveDate;
                    host.ticketId = preventives[0].ticketId;
                }
                else
                {
                    host.lastPreventiveDate = null;
                    host.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover a Preventiva do Servidor > " + ex.Message);
            }
        }

        // Delete Preventive Isomorfo
        public async Task DeletePreventive(int preventiveId, ServerHost host)
        {
            try
            {
                var preventive = await _context.serverPreventive.FirstOrDefaultAsync(p => p.id == preventiveId);
                if (preventive == null) throw new Exception("Preventiva não existe");

                _context.serverPreventive.Remove(preventive);

                await _context.SaveChangesAsync();

                var preventives = await _context.serverPreventive
                    .Where(p => p.hostId == host.id)
                    .OrderByDescending(p => p.preventiveDate).ThenByDescending(p => p.ticketId)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    host.lastPreventiveDate = preventives[0].preventiveDate;
                    host.ticketId = preventives[0].ticketId;
                }
                else
                {
                    host.lastPreventiveDate = null;
                    host.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover a Preventiva do Servidor > " + ex.Message);
            }
        }
    }
}
