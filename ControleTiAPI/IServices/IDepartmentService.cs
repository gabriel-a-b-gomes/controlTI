using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;

namespace ControleTiAPI.IServices
{
    public interface IDepartmentService
    {
        Task<List<Department>> GetPaginated(IQueryable<Department> queryable, PaginationDTO paginate);
        IQueryable<Department> GetDepartmentsFilter(FilterDTO filter);
        Task<List<Department>> GetAllDepartments();
        Task<List<Department>> GetAllDepartmentsEmployees();
        Task<Department?> GetDepartmentById(int id);
        Task AddDepartment(Department newDepartment);
        Task UpdateDepartment(Department upDepartment);
        Task DeleteDepartment(int id);
    }
}
