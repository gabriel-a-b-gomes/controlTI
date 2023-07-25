using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;
using ControleTiAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/employees")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "DEVICES")]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService, DataContext context)
        {
            _employeeService = employeeService;
            _context = context;
        }

        /************ EMPLOYEES ************/

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetPaginatedEmployee([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.employee.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var employees = await _employeeService.GetEmployeePaginated(queryable, paginate);

            return Ok(employees);
        }

        [HttpGet("infos")]
        public async Task<ActionResult<InfoEmployeeDTO>> GetEmployeeInfo()
        {
            var infos = await _employeeService.GetEmployeeInfo();

            return Ok(infos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById(int id)
        {
            var _employee = await _employeeService.GetEmployeeById(id);
            if (_employee == null)
            {
                return NotFound("Colaborador não existe.");
            }

            return Ok(_employee);
        }

        [HttpPost("filter")]
        public async Task<ActionResult<List<Employee>>> GetEmployeeFilter([FromBody] FilterDTO<EmployeeFilterDTO> filter)
        {
            var queryable = _employeeService.GetEmployeeFilter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var employees = await _employeeService.GetEmployeePaginated(queryable, filter.paginate);

            return Ok(employees);
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee([FromBody] EmployeeCreationDTO newEmployeeDTO)
        {
            try
            {
                var newEmployee = new Employee(newEmployeeDTO);

                await _employeeService.AddEmployee(newEmployee);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("ERRO em Colaborador: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEmployee([FromBody] EmployeeCreationDTO upEmployeeDTO)
        {
            try
            {
                var upEmployee = new Employee(upEmployeeDTO);

                await _employeeService.UpdateEmployee(upEmployee);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Colaborador: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            try
            {
                await _employeeService.DeleteEmployee(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Coloborador: " + ex.Message);
            }
        }

        /************ SKYPES ************/

        [HttpGet("skypes")]
        public async Task<ActionResult<List<SkypeEmployee>>> GetSkypesPaginated([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.skypeEmployee.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var skypes = await _employeeService.GetSkypePaginated(queryable, paginate);

            return Ok(skypes);
        }

        [HttpDelete("skypes/{id}")]
        public async Task<ActionResult> DeleteSkype(int id)
        {
            try
            {
                await _employeeService.DeleteSkype(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Coloborador: " + ex.Message);
            }
        }

        [HttpPost("skypes/filter")]
        public async Task<ActionResult<List<SkypeEmployee>>> GetSkypeFilter([FromBody] FilterDTO<AccountFilterDTO> filter)
        {
            var queryable = _employeeService.GetSkypeFilter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var skypes = await _employeeService.GetSkypePaginated(queryable, filter.paginate);

            return Ok(skypes);
        }

        /************ VPNS ************/

        [HttpGet("vpns")]
        public async Task<ActionResult<List<VpnEmployee>>> GetVPNSPaginated([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.vpnEmployee.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var vpns = await _employeeService.GetVpnPaginated(queryable, paginate);

            return Ok(vpns);
        }

        [HttpDelete("vpns/{id}")]
        public async Task<ActionResult> DeleteVPN(int id)
        {
            try
            {
                await _employeeService.DeleteVpn(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Coloborador: " + ex.Message);
            }
        }

        [HttpPost("vpns/filter")]
        public async Task<ActionResult<List<VpnEmployee>>> GetVPNFilter([FromBody] FilterDTO<AccountFilterDTO> filter)
        {
            var queryable = _employeeService.GetVpnFilter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var vpns = await _employeeService.GetVpnPaginated(queryable, filter.paginate);

            return Ok(vpns);
        }
    }
}
