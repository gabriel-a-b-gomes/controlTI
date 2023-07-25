using ControleTiAPI.DTOs;
using ControleTiAPI.IServices;
using ControleTiAPI.Helpers;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.Infos;

namespace ControleTiAPI.Services
{
    public class ChipService : IChipService
    {
        private readonly DataContext _context;
        private readonly ICellphoneService _cellPhoneService;

        public ChipService(DataContext context, ICellphoneService cellphoneService)
        {
            _context = context;
            _cellPhoneService = cellphoneService;
        }

        public async Task<List<Chip>> GetPaginated(IQueryable<Chip> queryable, PaginationDTO paginate)
        {
            var chips = await queryable
                .Include(c => c.cellPhone)
                .Include(c => c.department)
                .Include(c => c.employee)
                .OrderBy(c => c.number)
                .AsNoTracking()
                .Paginate(paginate).ToListAsync();

            return chips;
        }

        public async Task<Chip?> GetDeviceById(int id)
        {
            var chip = await _context.chip
                .Include(c => c.cellPhone)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.id == id);

            return chip;
        }

        public async Task<InfoChipDTO> GetInfoChip()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var countChipActive = await _context.chip.AsQueryable().AsNoTracking().CountAsync(c => c.status == (int)StatusFilterEnum.active);
            var countChipWithoutEmployee = await _context.chip.AsQueryable().AsNoTracking().CountAsync(c => c.status == (int)StatusFilterEnum.active && c.employee == null && c.department == null);
            var countChipWithCellphone = await _context.chip.AsQueryable().AsNoTracking().CountAsync(c => c.status == (int)StatusFilterEnum.active && c.cellPhone != null);
            var countChipBoughtLastYear = await _context.chip.AsQueryable().AsNoTracking().CountAsync(c => c.status == (int)StatusFilterEnum.active && c.acquisitionDate >= yearAgo);

            return new InfoChipDTO(countChipActive, countChipWithoutEmployee, countChipWithCellphone, countChipBoughtLastYear);
        }
             
        public async Task<FilterGetChipDTO> GetFilterFillChip()
        {
            var types = await _context.chip.GroupBy(c => c.type).OrderBy(g => g.Key).Select(g => g.Key).AsNoTracking().ToListAsync();
            var cellphoneMemorySizes = await _context.cellPhone.GroupBy(c => c.memorySize).OrderBy(g => g.Key).Select(g => g.Key).ToListAsync();
            var cellphoneStorageSizes = await _context.cellPhone.GroupBy(c => c.storageSize).OrderBy(g => g.Key).Select(g => g.Key).ToListAsync();

            return new FilterGetChipDTO(types, cellphoneMemorySizes, cellphoneStorageSizes);
        }

        public IQueryable<Chip> GetFilterChip(FilterDTO<ChipFilterDTO> filter)
        {
            var chipQueryable = _context.chip.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var s = searchDto.search.ToLower();

                chipQueryable = searchDto.attributte switch
                {
                    "number" => chipQueryable.Where(c => c.number.ToLower().Contains(s)),
                    "account" => chipQueryable.Where(c => c.account.ToLower().Contains(s)),
                    "iccid" => chipQueryable.Where(c => c.acctualICCID.ToLower().Contains(s)),
                    "department" => chipQueryable.Where(c => c.department != null && c.department.description.ToLower().Contains(s)),
                    "enterprise" => chipQueryable.Where(c => c.department != null && c.department.enterprise.ToLower().Contains(s)),
                    "employee" => chipQueryable.Where(c => c.employee != null && c.employee.displayName.ToLower().Contains(s)),
                    "cellphone" => chipQueryable.Where(c => c.cellPhone != null && c.cellPhone.model.ToLower().Contains(s)),
                    "assetnumber" => chipQueryable.Where(c => c.assetNumber != null && c.assetNumber.ToLower().Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                ChipFilterDTO extra = filter.extra;
                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    chipQueryable = chipQueryable.Where(c => c.status == extra.statusFilter);
                }

                if (extra.typeFilter != "all")
                {
                    chipQueryable = chipQueryable.Where(c => c.type == extra.typeFilter);
                }

                if (extra.deepFilterCellphone?.Length > 0)
                {
                    var dc = extra.deepFilterCellphone.ToLower();
                    chipQueryable = chipQueryable.Where(c =>
                        c.cellPhone == null ||
                        c.cellPhone.model.ToLower().Contains(dc) ||
                        c.cellPhone.processingUnit.ToLower().Contains(dc) ||
                        c.cellPhone.operationalSystem.ToLower().Contains(dc)
                    );
                }

                if (extra.toCellphoneMemorySize >= 0)
                {
                    chipQueryable = chipQueryable.Where(c =>
                        c.cellPhone == null ||
                        c.cellPhone.memorySize <= extra.toCellphoneMemorySize
                    );
                }

                if (extra.toCellphoneStorageSize >= 0)
                {
                    chipQueryable = chipQueryable.Where(c =>
                        c.cellPhone == null ||
                        c.cellPhone.storageSize <= extra.toCellphoneStorageSize
                    );
                }

                if (extra.fromAcquisitionDate != null)
                {
                    chipQueryable = chipQueryable.Where(c => c.acquisitionDate >= extra.fromAcquisitionDate);
                }

                if (extra.toAcquisitionDate != null && (extra.fromAcquisitionDate == null || extra.toAcquisitionDate >= extra.fromAcquisitionDate))
                {
                    chipQueryable = chipQueryable.Where(c => c.acquisitionDate <= extra.toAcquisitionDate);
                }
            }

            return chipQueryable;
        }

        public async Task<FormGetChipDTO> FormGetChip()
        {
            var departments = await _context.department.OrderBy(d => d.description).ThenBy(d => d.enterprise).ToListAsync();
            var employees = await _context.employee.OrderBy(d => d.name).ToListAsync();
            var cellphones = await _context.cellPhone.OrderBy(c => c.model).ToListAsync();

            return new FormGetChipDTO(departments, employees, cellphones);
        }

        public async Task AddDevice(Chip newChip)
        {
            try
            {
                if (newChip == null) throw new Exception("Entrada nula, inserção não é válida.");

                var existChip = await _context.chip.FirstOrDefaultAsync(c => c.number == newChip.number);

                if (existChip != null) throw new Exception("Já existe chip com este número");

                if (newChip.cellPhone != null)
                {
                    var cellphone = await _cellPhoneService.CheckOrAddCellPhone(newChip.cellPhone);
                    newChip.cellPhone = cellphone;
                } 

                newChip.createdAt = DateTime.Now;
                newChip.updatedAt = DateTime.Now; 

                await _context.chip.AddAsync(newChip);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao Inserir o Chip: " + ex.Message);
            }
        }

        public async Task UpdateDevice(Chip upChip)
        {
            try
            {
                if (upChip == null) throw new Exception("Alteração nula.");

                var chip = await _context.chip
                    .Include(c => c.cellPhone)
                    .FirstOrDefaultAsync(c => c.id == upChip.id);

                if (chip == null) throw new Exception("Chip não encontrado.");

                var existChip = await _context.chip.FirstOrDefaultAsync(c => c.number == upChip.number);

                if (existChip != null && chip.id != existChip.id) throw new Exception("Já existe chip com este número");

                if (upChip.cellPhone != null && (chip.cellPhone == null || !chip.cellPhone.Equals(upChip.cellPhone)))
                {
                    var cellPhone = await _cellPhoneService.CheckOrAddCellPhone(upChip.cellPhone);

                    chip.cellPhone = cellPhone;
                }

                if (upChip.cellPhone == null && chip.cellPhone != null)
                {
                    chip.cellPhone = null;
                } 
                
                chip.number = upChip.number;
                chip.status = upChip.status;
                chip.account = upChip.account;
                chip.type = upChip.type;
                chip.acctualICCID = upChip.acctualICCID;
                chip.assetNumber = upChip.assetNumber;
                chip.acquisitionDate = upChip.acquisitionDate;
                chip.notes = upChip.notes;

                chip.departmentId = upChip.departmentId;
                chip.employeeId = upChip.employeeId;

                chip.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar o Chip: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var chip = await _context.chip.FirstOrDefaultAsync(c => c.id == id);

                if (chip == null) throw new Exception("Chip não encontrado.");

                _context.chip.Remove(chip);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover o Chip: " + ex.Message);
            }
        }
    }
}
