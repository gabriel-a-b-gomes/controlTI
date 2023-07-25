using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;

namespace ControleTiAPI.Services
{
    public class RamalService : IRamalService
    {
        private readonly DataContext _context;

        public RamalService(DataContext context, IDepartmentService departmentService)
        {
            _context = context;
        }

        public async Task<List<Ramal>> GetPaginated(IQueryable<Ramal> queryable, PaginationDTO paginate)
        {
            var ramais = await queryable
                .Include(r => r.department)
                .Include(r => r.employee)
                .OrderBy(r => r.number)
                .AsNoTracking()
                .Paginate(paginate).ToListAsync();

            return ramais;
        }

        public async Task<Ramal?> GetDeviceById(int id)
        {
            var ramal = await _context.ramal.FirstOrDefaultAsync(r => r.id == id);

            return ramal;
        }

        public async Task<FormGetRamalDTO> FormGet()
        {
            var departments = await _context.department.OrderBy(d => d.description).ThenBy(d => d.enterprise).ToListAsync();
            var employees = await _context.employee.OrderBy(d => d.name).ToListAsync();

            return new FormGetRamalDTO(departments, employees);
        }

        public async Task<FilterGetRamalDTO> FilterGetRamal()
        {
            var exitNumbers = await _context.ramal.GroupBy(r => r.exitNumber).OrderBy(r => r.Key).Select(r => r.Key).ToListAsync();
            var gateways = await _context.ramal.GroupBy(r => r.deviceConfig).OrderBy(r => r.Key).Select(r => r.Key).ToListAsync();

            return new FilterGetRamalDTO(exitNumbers, gateways);
        }

        public IQueryable<Ramal> GetFilterRamal(FilterDTO<RamalFilterDTO> filter)
        {
            var ramalQueryable = _context.ramal.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var s = searchDto.search.ToLower();

                ramalQueryable = searchDto.attributte switch
                {
                    "number" => ramalQueryable.Where(r => r.number.ToLower().Contains(s)),
                    "deviceuser" => ramalQueryable.Where(r => r.deviceUser.ToLower().Contains(s)),
                    "devicepassword" => ramalQueryable.Where(r => r.devicePassword.ToLower().Contains(s)),
                    "model" => ramalQueryable.Where(r => r.model != null && r.model.ToLower().Contains(s)),
                    "department" => ramalQueryable.Where(r => r.department != null && r.department.description.ToLower().Contains(s)),
                    "enterprise" => ramalQueryable.Where(r => r.department != null && r.department.enterprise.ToLower().Contains(s)),
                    "employee" => ramalQueryable.Where(r => r.employee != null && r.employee.displayName.ToLower().Contains(s)),
                    "assetnumber" => ramalQueryable.Where(r => r.assetNumber != null && r.assetNumber.ToLower().Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                RamalFilterDTO extra = filter.extra;
                if (extra.configExitNumber != "all")
                {
                    ramalQueryable = ramalQueryable.Where(r => r.exitNumber == extra.configExitNumber);
                }

                if (extra.classifyRamal != (int)IsDepartmentEnum.all)
                {
                    ramalQueryable = ramalQueryable.Where(r => extra.classifyRamal == (int)IsDepartmentEnum.onlyDeparment ? r.isDepartment : !r.isDepartment);
                }

                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    ramalQueryable = ramalQueryable.Where(r => r.status == extra.statusFilter);
                }

                if (extra.configIp?.Length > 0)
                {
                    ramalQueryable = ramalQueryable.Where(r => r.deviceIP.ToLower().Contains(extra.configIp.ToLower()));
                }

                if (extra.configGateway != "all")
                {
                    ramalQueryable = ramalQueryable.Where(r => r.deviceConfig == extra.configGateway);
                }

                if (extra.fromAcquisitionDate != null)
                {
                    ramalQueryable = ramalQueryable.Where(r => r.acquisitionDate >= extra.fromAcquisitionDate);
                }

                if (extra.toAcquisitionDate != null && (extra.fromAcquisitionDate == null || extra.toAcquisitionDate >= extra.fromAcquisitionDate))
                {
                    ramalQueryable = ramalQueryable.Where(r => r.acquisitionDate <= extra.toAcquisitionDate);
                }
            }

            return ramalQueryable;
        }

        public async Task AddDevice(Ramal newRamal)
        {
            try
            {
                if (newRamal == null) throw new Exception("Nova inserção não pode ser nula.");

                var rVerify = await _context.ramal.FirstOrDefaultAsync(r => r.number == newRamal.number);

                if (rVerify != null) throw new Exception("Este número de ramal já está cadastrado.");

                var department = await _context.department.FirstOrDefaultAsync(d => d.id == newRamal.departmentId);

                if (department == null) throw new Exception("Departamento não existe");

                newRamal.createdAt = DateTime.Now;
                newRamal.updatedAt = DateTime.Now;

                await _context.ramal.AddAsync(newRamal);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do Ramal: " + ex.Message);
            }
        }

        public async Task UpdateDevice(Ramal upRamal)
        {
            try
            {
                if (upRamal == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var ramal = await _context.ramal.FirstOrDefaultAsync(r => r.id == upRamal.id);

                if (ramal == null) throw new Exception("Ramal não encontrado.");

                var rVerify = await _context.ramal.FirstOrDefaultAsync(r => r.number == upRamal.number);

                if (rVerify != null && rVerify.id != ramal.id) throw new Exception("Este número de ramal já está cadastrado.");

                var department = await _context.department.FirstOrDefaultAsync(d => d.id == upRamal.departmentId);

                if (department == null) throw new Exception("Departamento não existe");

                ramal.number = upRamal.number;
                ramal.model = upRamal.model;
                ramal.exitNumber = upRamal.exitNumber;
                ramal.isDepartment = upRamal.isDepartment;
                ramal.deviceIP = upRamal.deviceIP;
                ramal.deviceConfig = upRamal.deviceConfig;
                ramal.deviceUser = upRamal.deviceUser;
                ramal.devicePassword = upRamal.devicePassword;
                ramal.status = upRamal.status;
                ramal.assetNumber = upRamal.assetNumber;
                ramal.acquisitionDate = upRamal.acquisitionDate;
                ramal.notes = upRamal.notes;
                ramal.updatedAt = DateTime.Now;

                ramal.employeeId = upRamal.employeeId;
                ramal.departmentId = upRamal.departmentId;
                ramal.department = department;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do Nobreak: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var ramal = await _context.ramal.FirstOrDefaultAsync(r => r.id == id);

                if (ramal == null) throw new Exception("Ramal não encontrado.");

                _context.ramal.Remove(ramal);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Ramal: " + ex.Message);
            }
        }
    }
}
