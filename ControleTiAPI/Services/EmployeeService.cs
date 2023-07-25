using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;
using Microsoft.Identity.Client;
using System.Linq;

namespace ControleTiAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly DataContext _context;

        public EmployeeService(DataContext context)
        {
            _context = context;
        }

        /************ EMPLOYEES ************/

        public async Task<List<Employee>> GetEmployeePaginated(IQueryable<Employee> queryable, PaginationDTO paginate)
        {
            var employees = await queryable
                            .Include(e => e.department)
                            .Include(e => e.ramals)
                            .Include(e => e.chips)
                            .Include(e => e.computers)
                            .OrderBy(e => e.name)
                            .AsNoTracking()
                            .Paginate(paginate).ToListAsync();

            return employees;
        }

        public async Task<Employee?> GetEmployeeById(int id)
        {
            var _employee = await _context.employee
                    .Include(e => e.department)
                    .Include(e => e.skype)
                    .Include(e => e.vpn)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(e => e.id == id);

            if (_employee is null) return null;

            return _employee;
        }

        public async Task<InfoEmployeeDTO> GetEmployeeInfo()
        {
            var countEmployee = await _context.employee.AsQueryable().AsNoTracking().CountAsync(e => e.status == (int)StatusFilterEnum.active);
            var countSkype = await _context.skypeEmployee.AsQueryable().AsNoTracking().CountAsync(s => s.employee.status == (int)StatusFilterEnum.active);
            var countVpn = await _context.vpnEmployee.AsQueryable().AsNoTracking().CountAsync(v => v.employee.status == (int)StatusFilterEnum.active);

            return new InfoEmployeeDTO(countEmployee, countSkype, countVpn);
        }

        public IQueryable<Employee> GetEmployeeFilter(FilterDTO<EmployeeFilterDTO> filter)
        {
            var employeeQueryable = _context.employee.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var sr = searchDto.search.ToLower();

                employeeQueryable = searchDto.attributte switch
                {
                    "displayname" => employeeQueryable.Where(e => e.displayName.ToLower().Contains(sr)),
                    "department" => employeeQueryable.Where(e => e.department.description.ToLower().Contains(sr)),
                    "enterprise" => employeeQueryable.Where(e => e.department.enterprise.ToLower().Contains(sr)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                EmployeeFilterDTO extra = filter.extra;

                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    employeeQueryable = employeeQueryable.Where(e => e.status == extra.statusFilter);
                }

                if (extra.employeeUser?.Length > 0)
                {
                    employeeQueryable = employeeQueryable.Where(e => e.name.Contains(extra.employeeUser));
                }

                if (extra.employeeEmail?.Length > 0)
                {
                    employeeQueryable = employeeQueryable.Where(e => e.email.Contains(extra.employeeEmail));
                }

                if (extra.employeeEmailPassword?.Length > 0)
                {
                    employeeQueryable = employeeQueryable.Where(e => e.emailPassword.Contains(extra.employeeEmailPassword));
                }

                if (extra.employeeAlternative?.Length > 0)
                {
                    employeeQueryable = employeeQueryable.Where(e => e.alternativeEmail != null && e.alternativeEmail.Contains(extra.employeeAlternative));
                }

                if (extra.fromIngressDate != null)
                {
                    employeeQueryable = employeeQueryable.Where(e => e.ingressDate >= extra.fromIngressDate);
                }

                if (extra.toIngressDate != null && (extra.fromIngressDate == null || extra.toIngressDate >= extra.fromIngressDate))
                {
                    employeeQueryable = employeeQueryable.Where(e => e.ingressDate <= extra.toIngressDate);
                }
            }

            return employeeQueryable;
        }

        public async Task AddEmployee(Employee newEmployee)
        {
            try
            {
                if (newEmployee == null) throw new Exception("Nova inserção não pode ser nula.");

                var eVerify = await _context.employee.FirstOrDefaultAsync(e => e.name == newEmployee.name);

                if (eVerify != null) throw new Exception("Já existe Colaborador com este nome.");

                newEmployee.createdAt = DateTime.Now;
                newEmployee.updatedAt = DateTime.Now;

                await _context.employee.AddAsync(newEmployee);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do Colaborador: " + ex.Message);
            }
        }

        public async Task UpdateEmployee(Employee upEmployee)
        {
            try
            {
                if (upEmployee == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var employee = await _context.employee
                    .Include(e => e.department)
                    .Include(e => e.skype)
                    .Include(e => e.vpn)
                    .FirstOrDefaultAsync(e => e.id == upEmployee.id);

                if (employee == null) throw new Exception("Colaborador não encontrado.");

                var eVerify = await _context.employee.FirstOrDefaultAsync(e => e.name == upEmployee.name);

                if (eVerify != null && eVerify.id != employee.id) throw new Exception("Já existe Colaborador com este novo código.");

                if (employee.vpn != null && upEmployee.vpn == null)
                    _context.vpnEmployee.Remove(employee.vpn);

                if (employee.skype != null && upEmployee.skype == null)
                    _context.skypeEmployee.Remove(employee.skype);

                employee.name = upEmployee.name;
                employee.displayName = upEmployee.displayName;
                employee.email = upEmployee.email;
                employee.emailPassword = upEmployee.emailPassword;
                employee.alternativeEmail = upEmployee.alternativeEmail;
                employee.alternativeEmailPassword = upEmployee.alternativeEmailPassword;
                employee.status = upEmployee.status;
                employee.ingressDate = upEmployee.ingressDate;
                employee.notes = upEmployee.notes;
                employee.departmentId = upEmployee.departmentId;

                if (employee.vpn == null || upEmployee.vpn == null)
                {
                    employee.vpn = upEmployee.vpn;
                } 
                else
                {
                    employee.vpn.vpnUser = upEmployee.vpn.vpnUser;
                    employee.vpn.vpnPassword = upEmployee.vpn.vpnPassword;
                }
                
                if (employee.skype == null || upEmployee.skype == null)
                {
                    employee.skype = upEmployee.skype;
                }
                else
                {
                    employee.skype.skypeUser = upEmployee.skype.skypeUser;
                    employee.skype.skypePassword = upEmployee.skype.skypePassword;
                }
                

                employee.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do Colaborador: " + ex.Message);
            }
        }

        public async Task DeleteEmployee(int id)
        {
            try
            {
                var employee = await _context.employee.Include(e => e.vpn).Include(e => e.skype).FirstOrDefaultAsync(e => e.id == id);

                if (employee == null) throw new Exception("Colaborador não encontrado.");
    
                if (employee.vpn != null)
                    _context.vpnEmployee.Remove(employee.vpn);
                if (employee.skype != null)
                    _context.skypeEmployee.Remove(employee.skype);

                _context.employee.Remove(employee);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Colaborador: " + ex.Message);
            }
        }

        /************ SKYPES ************/

        public async Task<List<SkypeEmployee>> GetSkypePaginated(IQueryable<SkypeEmployee> queryable, PaginationDTO paginate)
        {
            var skypes = await queryable.Include(s => s.employee).ThenInclude(e => e.department).OrderBy(s => s.employee.name).AsNoTracking().Paginate(paginate).ToListAsync();

            return skypes;
        }

        public async Task DeleteSkype(int id)
        {
            try
            {
                var skype = await _context.skypeEmployee.FirstOrDefaultAsync(e => e.id == id);

                if (skype == null) throw new Exception("Skype não encontrado.");

                _context.skypeEmployee.Remove(skype);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Skype: " + ex.Message);
            }
        }

        public IQueryable<SkypeEmployee> GetSkypeFilter(FilterDTO<AccountFilterDTO> filter)
        {
            var skypeQueryable = _context.skypeEmployee.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var sr = searchDto.search.ToLower();

                skypeQueryable = searchDto.attributte switch
                {
                    "skypeuser" => skypeQueryable.Where(s => s.skypeUser.ToLower().Contains(sr)),
                    "skypepassword" => skypeQueryable.Where(s => s.skypePassword.ToLower().Contains(sr)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                AccountFilterDTO extra = filter.extra;

                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    skypeQueryable = skypeQueryable.Where(s => s.employee.status == extra.statusFilter);
                }

                if (extra.employeeUser?.Length > 0)
                {
                    skypeQueryable = skypeQueryable.Where(s => s.employee.name.Contains(extra.employeeUser));
                }

                if (extra.employeeName?.Length > 0)
                {
                    skypeQueryable = skypeQueryable.Where(s => s.employee.displayName.Contains(extra.employeeName));
                }

                if (extra.employeeDepartment?.Length > 0)
                {
                    skypeQueryable = skypeQueryable.Where(s => s.employee.department.description.Contains(extra.employeeDepartment));
                }

                if (extra.employeeEnterprise?.Length > 0)
                {
                    skypeQueryable = skypeQueryable.Where(s => s.employee.department.enterprise.Contains(extra.employeeEnterprise));
                }
            }

            return skypeQueryable;
        }

        /************ VPNs ************/

        public async Task<List<VpnEmployee>> GetVpnPaginated(IQueryable<VpnEmployee> queryable, PaginationDTO paginate)
        {
            var vpns = await queryable.Include(v => v.employee).ThenInclude(e => e.department).OrderBy(s => s.employee.name).AsNoTracking().Paginate(paginate).ToListAsync();

            return vpns;
        }

        public async Task DeleteVpn(int id)
        {
            try
            {
                var vpn = await _context.vpnEmployee.FirstOrDefaultAsync(e => e.id == id);

                if (vpn == null) throw new Exception("VPN não encontrado.");

                _context.vpnEmployee.Remove(vpn);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do VPN: " + ex.Message);
            }
        }

        public IQueryable<VpnEmployee> GetVpnFilter(FilterDTO<AccountFilterDTO> filter)
        {
            var vpnQueryable = _context.vpnEmployee.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var sr = searchDto.search.ToLower();

                vpnQueryable = searchDto.attributte switch
                {
                    "vpnuser" => vpnQueryable.Where(v => v.vpnUser.ToLower().Contains(sr)),
                    "vpnpassword" => vpnQueryable.Where(v => v.vpnPassword.ToLower().Contains(sr)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                AccountFilterDTO extra = filter.extra;

                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    vpnQueryable = vpnQueryable.Where(v => v.employee.status == extra.statusFilter);
                }

                if (extra.employeeUser?.Length > 0)
                {
                    vpnQueryable = vpnQueryable.Where(v => v.employee.name.Contains(extra.employeeUser));
                }

                if (extra.employeeName?.Length > 0)
                {
                    vpnQueryable = vpnQueryable.Where(v => v.employee.displayName.Contains(extra.employeeName));
                }

                if (extra.employeeDepartment?.Length > 0)
                {
                    vpnQueryable = vpnQueryable.Where(v => v.employee.department.description.Contains(extra.employeeDepartment));
                }

                if (extra.employeeEnterprise?.Length > 0)
                {
                    vpnQueryable = vpnQueryable.Where(v => v.employee.department.enterprise.Contains(extra.employeeEnterprise));
                }
            }

            return vpnQueryable;
        }
    }
}
