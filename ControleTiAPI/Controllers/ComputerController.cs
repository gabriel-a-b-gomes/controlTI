using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Charts;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.DTOs.Preventives;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models.Preventives;
using ControleTiAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using System.Linq;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/computers")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "EVERYONE")]
    public class ComputerController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IComputerService _computerService;

        public ComputerController(IComputerService computerService, DataContext context)
        {
            _computerService = computerService;
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<Computer>>> GetPaginatedComputers([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.computer.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var computers = await _computerService.GetPaginated(queryable, paginate);

            return Ok(computers);
        }

        
        [HttpPost("filter")]
        public async Task<ActionResult<InfoComputerDTO>> GetFilterComputer([FromBody] FilterDTO<ComputerFilterDTO> filter)
        {
            var queryable = _computerService.GetFilterComputer(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var computers = await _computerService.GetPaginated(queryable, filter.paginate);

            return Ok(computers);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Computer>> GetComputerById(int id)
        {
            var computer = await _computerService.GetDeviceById(id);
            if (computer == null)
            {
                return NotFound("Computador não existe.");
            }

            return Ok(computer);
        }

        [HttpPost("chart")]
        public async Task<ActionResult<ChartComputerDTO>> GetChartComputer([FromBody] FilterDTO<ComputerFilterDTO> filter)
        {
            var computers = _computerService.GetFilterComputer(filter);
            var chart = await _computerService.GetChartComputer(computers);

            return Ok(chart);
        }

        [HttpGet("infos")]
        public async Task<ActionResult<InfoComputerDTO>> GetInfoComputer()
        {
            var infos = await _computerService.GetInfoComputer();

            return Ok(infos);
        }

        
        [HttpGet("filterget")]
        public async Task<ActionResult<FilterGetComputerDTO>> FilterGetComputer()
        {
            var filterget = await _computerService.FilterGetComputer();

            return Ok(filterget);
        }

        [Authorize(Policy = "DEVICES")]
        [HttpGet("formget")]
        public async Task<ActionResult<FormGetComputerDTO>> FormGetComputer()
        {
            var formget = await _computerService.FormGetComputer();

            return Ok(formget);
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPost]
        public async Task<ActionResult> PostComputer([FromBody] ComputerCreationDTO newComputerDto)
        {
            try
            {
                var newComputer = new Computer(newComputerDto);

                await _computerService.AddDevice(newComputer);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("ERRO em Computador: " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPut]
        public async Task<ActionResult> PutComputer([FromBody] ComputerCreationDTO upComputerDto)
        {
            try
            {
                var upComputer = new Computer(upComputerDto);

                await _computerService.UpdateDevice(upComputer);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Computador: " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteComputer(int id)
        {
            try
            {
                await _computerService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Computador: " + ex.Message);
            }
        }

        
        [HttpGet("preventives/todo")]
        public async Task<ActionResult<List<Computer>>> GetCompPreventivesTODO([FromQuery] PaginationDTO paginate)
        {
            var todo = _computerService.GetPreventivesTodo();
            await HttpContext.InsertParameterPaginationInHeader(todo);
            var computers = await _computerService.GetPaginatedPreventives(todo, paginate);

            return Ok(computers);
        }

        
        [HttpGet("preventives/done")]
        public async Task<ActionResult<List<Computer>>> GetCompPreventivesDONE([FromQuery] PaginationDTO paginate)
        {
            var done = _computerService.GetPreventivesDone();
            await HttpContext.InsertParameterPaginationInHeader(done);
            var computers = await _computerService.GetPaginatedPreventives(done, paginate);

            return Ok(computers);
        }

        
        [HttpPost("preventives/todo/filter")]
        public async Task<ActionResult<List<Computer>>> GetCompPreventivesTODOFilter([FromBody] PreventiveFilterDTO preventiveFilter)
        {
            var todo = _computerService.GetPreventivesTodo();
            var filter = _computerService.GetPreventivesFiltered(todo, preventiveFilter.searches);
            await HttpContext.InsertParameterPaginationInHeader(filter);
            var computers = await _computerService.GetPaginatedPreventives(filter, preventiveFilter.paginate);

            return Ok(computers);
        }

        
        [HttpPost("preventives/done/filter")]
        public async Task<ActionResult<List<Computer>>> GetCompPreventivesDONEFilter([FromBody] PreventiveFilterDTO preventiveFilter)
        {
            var done = _computerService.GetPreventivesDone();
            var filter = _computerService.GetPreventivesFiltered(done, preventiveFilter.searches);
            await HttpContext.InsertParameterPaginationInHeader(filter);
            var computers = await _computerService.GetPaginatedPreventives(filter, preventiveFilter.paginate);

            return Ok(computers);
        }

        
        [HttpPost("preventive")]
        public async Task<ActionResult> AddPreventive([FromBody] PreventiveCreationDTO newPreventive)
        {
            try
            {
                ComputerPreventive preventive = new ComputerPreventive(newPreventive);

                await _computerService.AddPreventive(preventive);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Computador: " + ex.Message);
            }
        }

        
        [HttpPut("preventive")]
        public async Task<ActionResult> UpdatePreventive([FromBody] PreventiveCreationDTO upPreventive)
        {
            try
            {
                ComputerPreventive preventive = new ComputerPreventive(upPreventive);

                await _computerService.UpdatePreventive(preventive);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Computador: " + ex.Message);
            }
        }

        
        [HttpDelete("preventive/{preventiveId}")]
        public async Task<ActionResult> DeletePreventive(int preventiveId, [FromQuery] int deviceId) 
        {
            try
            {
                await _computerService.DeletePreventive(preventiveId, deviceId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Computador: " + ex.Message);
            }
        }
    }
}
