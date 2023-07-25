using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.Infos;

namespace ControleTiAPI.IServices
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetEmployeePaginated(IQueryable<Employee> queryable, PaginationDTO paginate);
        Task<Employee?> GetEmployeeById(int id);
        Task AddEmployee(Employee newEmployee);
        Task UpdateEmployee(Employee upEmployee);
        Task DeleteEmployee(int id);

        Task<InfoEmployeeDTO> GetEmployeeInfo();
        IQueryable<Employee> GetEmployeeFilter(FilterDTO<EmployeeFilterDTO> filter);

        /* Skype */
        Task<List<SkypeEmployee>> GetSkypePaginated(IQueryable<SkypeEmployee> queryable, PaginationDTO paginate);
        Task DeleteSkype(int id);
        IQueryable<SkypeEmployee> GetSkypeFilter(FilterDTO<AccountFilterDTO> filter);

        /* VPN */

        Task<List<VpnEmployee>> GetVpnPaginated(IQueryable<VpnEmployee> queryable, PaginationDTO paginate);
        Task DeleteVpn(int id);
        IQueryable<VpnEmployee> GetVpnFilter(FilterDTO<AccountFilterDTO> filter);
    }
}
