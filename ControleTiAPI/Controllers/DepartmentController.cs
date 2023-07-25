using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;
using ControleTiAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/departments")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "DEVICES")]
    public class DepartmentController : Controller
    {
        private readonly DataContext _context;
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService, DataContext context)
        {
            _departmentService = departmentService;
            _context = context;
        }

        [Authorize(Policy = "ADMIN")]
        [HttpGet]
        public async Task<ActionResult<List<Department>>> GetPaginatedDepartament([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.department.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var departaments = await _departmentService.GetPaginated(queryable, paginate);

            return Ok(departaments);
        }

        [Authorize(Policy = "ADMIN")]
        [HttpPost("filter")]
        public async Task<ActionResult<List<Department>>> GetDepartmentFilter([FromBody] FilterDTO filter)
        {
            var queryable = _departmentService.GetDepartmentsFilter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var departaments = await _departmentService.GetPaginated(queryable, filter.paginate);

            return Ok(departaments);
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<Department>>> GetAllDepartments()
        {
            var _departments = await _departmentService.GetAllDepartments();

            return Ok(_departments);
        }

        [Authorize(Policy = "ADMIN")]
        [HttpGet("e/all")]
        public async Task<ActionResult<List<Department>>> GetAllDepartmentEmployee()
        {
            var _departments = await _departmentService.GetAllDepartmentsEmployees();

            return Ok(_departments);
        }

        [Authorize(Policy = "ADMIN")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartmentById(int id)
        {
            var _department = await _departmentService.GetDepartmentById(id);
            if (_department == null)
            {
                return NotFound("Departmento não existe.");
            }

            return Ok(_department);
        }

        [Authorize(Policy = "ADMIN")]
        [HttpPost]
        public async Task<ActionResult> PostDepartment([FromBody] Department newDepartment)
        {
            try
            {
                await _departmentService.AddDepartment(newDepartment);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("ERRO em Departamento: " + ex.Message);
            }
        }

        [Authorize(Policy = "ADMIN")]
        [HttpPut]
        public async Task<ActionResult> PutDepartment([FromBody] Department upDepartment)
        {
            try
            {
                await _departmentService.UpdateDepartment(upDepartment);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Departamento: " + ex.Message);
            }
        }

        [Authorize(Policy = "ADMIN")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDepartment(int id)
        {
            try
            {
                await _departmentService.DeleteDepartment(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Departamento: " + ex.Message);
            }
        }
    }
}
