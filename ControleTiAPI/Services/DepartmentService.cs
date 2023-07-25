using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;
using System.Runtime.InteropServices;

namespace ControleTiAPI.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly DataContext _context;

        public DepartmentService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Department>> GetPaginated(IQueryable<Department> queryable, PaginationDTO paginate)
        {
            var departments = await queryable.Include(d => d.employees).OrderBy(d => d.description).ThenBy(d => d.enterprise).AsNoTracking().Paginate(paginate).ToListAsync();

            return departments;
        }

        public IQueryable<Department> GetDepartmentsFilter(FilterDTO filter)
        {
            var departments = _context.department.AsQueryable();

            foreach (var searchDTO in filter.searches)
            {
                var s = searchDTO.search.ToLower();

                departments = searchDTO.attributte switch
                {
                    "description" => departments.Where(d => d.description.Contains(s)),
                    "enterprise" => departments.Where(d => d.enterprise.Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            return departments;
        }

        public async Task<List<Department>> GetAllDepartments()
        {
            var _departments = await _context.department.OrderBy(d => d.description).ThenBy(d => d.enterprise).AsNoTracking().ToListAsync();

            return _departments;
        }

        public async Task<List<Department>> GetAllDepartmentsEmployees()
        {
            var _departments = await _context.department.Include(d => d.employees).AsNoTracking().ToListAsync();

            return _departments;
        }

        public async Task<Department?> GetDepartmentById(int id)
        {
            var _department = await _context.department.FirstOrDefaultAsync(d => d.id == id);
            if (_department is null) return null;

            return _department;
        }

        public async Task AddDepartment(Department newDepartment)
        {
            try
            {
                if (newDepartment == null) throw new Exception("Nova inserção não pode ser nula.");

                var dVerify = await _context.department
                    .FirstOrDefaultAsync(d => d.description == newDepartment.description && d.enterprise == newDepartment.enterprise);

                if (dVerify != null) throw new Exception("Este departmento já existe.");

                newDepartment.createdAt = DateTime.Now;
                newDepartment.updatedAt = DateTime.Now;

                await _context.department.AddAsync(newDepartment);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do departmento: " + ex.Message);
            }
        }

        public async Task UpdateDepartment(Department upDepartment)
        {
            try
            {
                if (upDepartment == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var department = await _context.department.FirstOrDefaultAsync(d => d.id == upDepartment.id);

                if (department == null) throw new Exception("departmento não encontrado.");

                var dVerify = await _context.department
                    .FirstOrDefaultAsync(d => d.description == upDepartment.description && d.enterprise == upDepartment.enterprise);

                if (dVerify != null && dVerify.id != department.id) throw new Exception("Este departmento já existe.");

                department.description = upDepartment.description;
                department.enterprise = upDepartment.enterprise;
                department.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do Departamento: " + ex.Message);
            }
        }

        public async Task DeleteDepartment(int id)
        {
            try
            {
                var department = await _context.department.Include(d => d.employees).FirstOrDefaultAsync(d => d.id == id);

                if (department == null) throw new Exception("Departamento não encontrado.");

                if (department.employees.Count > 0) throw new Exception("Existem Colaboradores nesse departamento.");
 
                _context.department.Remove(department);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Departamento: " + ex.Message);
            }
        }
    }
}
