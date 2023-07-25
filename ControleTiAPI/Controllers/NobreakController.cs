using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.Preventives;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models.Preventives;
using ControleTiAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/nobreaks")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "EVERYONE")]
    public class NobreakController : Controller
    {
        private readonly DataContext _context;
        private readonly INobreakService _nobreakService;

        public NobreakController(INobreakService nobreakService, DataContext context)
        {
            _nobreakService = nobreakService;
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<Nobreak>>> GetPaginatedNobreak([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.nobreak.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var nobreaks = await _nobreakService.GetPaginated(queryable, paginate);

            return Ok(nobreaks);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Nobreak>> GetNobreakById(int id)
        {
            var nobreak = await _nobreakService.GetDeviceById(id);
            if (nobreak == null)
            {
                return NotFound("Nobreak não existe.");
            }

            return Ok(nobreak);
        }

        
        [HttpPost("filter")]
        public async Task<ActionResult<List<Nobreak>>> GetFilterNobreak([FromBody] FilterDTO<NobreakFilterDTO> filter)
        {
            var queryable = _nobreakService.GetFilterNobreak(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var nobreaks = await _nobreakService.GetPaginated(queryable, filter.paginate);

            return Ok(nobreaks);
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPost]
        public async Task<ActionResult> PostNobreak([FromBody] Nobreak newNobreak)
        {
            try
            {
                await _nobreakService.AddDevice(newNobreak);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("ERRO em Nobreak: " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPut]
        public async Task<ActionResult> PutNobreak([FromBody] Nobreak upNobreak)
        {
            try
            {
                await _nobreakService.UpdateDevice(upNobreak);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("Erro em Nobreak: " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNobreak(int id)
        {
            try
            {
                await _nobreakService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Nobreak: " + ex.Message);
            }
        }

        
        [HttpGet("preventives/todo")]
        public async Task<ActionResult<List<Nobreak>>> GetNobreakPreventivesTODO([FromQuery] PaginationDTO paginate)
        {
            var todo = _nobreakService.GetPreventivesTodo();
            await HttpContext.InsertParameterPaginationInHeader(todo);
            var nobreaks = await _nobreakService.GetPaginatedPreventives(todo, paginate);

            return Ok(nobreaks);
        }

        
        [HttpGet("preventives/done")]
        public async Task<ActionResult<List<Nobreak>>> GetNobreakPreventivesDONE([FromQuery] PaginationDTO paginate)
        {
            var done = _nobreakService.GetPreventivesDone();
            await HttpContext.InsertParameterPaginationInHeader(done);
            var nobreaks = await _nobreakService.GetPaginatedPreventives(done, paginate);

            return Ok(nobreaks);
        }

        
        [HttpPost("preventives/todo/filter")]
        public async Task<ActionResult<List<Nobreak>>> GetNobreakPreventivesTODOFilter([FromBody] PreventiveFilterDTO preventiveFilter)
        {
            var todo = _nobreakService.GetPreventivesTodo();
            var filter = _nobreakService.GetPreventivesFiltered(todo, preventiveFilter.searches);
            await HttpContext.InsertParameterPaginationInHeader(filter);
            var nobreaks = await _nobreakService.GetPaginatedPreventives(filter, preventiveFilter.paginate);

            return Ok(nobreaks);
        }

        
        [HttpPost("preventives/done/filter")]
        public async Task<ActionResult<List<Nobreak>>> GetDVRPreventivesDONEFilter([FromBody] PreventiveFilterDTO preventiveFilter)
        {
            var done = _nobreakService.GetPreventivesDone();
            var filter = _nobreakService.GetPreventivesFiltered(done, preventiveFilter.searches);
            await HttpContext.InsertParameterPaginationInHeader(filter);
            var nobreaks = await _nobreakService.GetPaginatedPreventives(filter, preventiveFilter.paginate);

            return Ok(nobreaks);
        }

        
        [HttpPost("preventive")]
        public async Task<ActionResult> AddPreventive([FromBody] PreventiveCreationDTO newPreventive)
        {
            try
            {
                NobreakPreventive preventive = new NobreakPreventive(newPreventive);

                await _nobreakService.AddPreventive(preventive);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Nobreak: " + ex.Message);
            }
        }

        
        [HttpPut("preventive")]
        public async Task<ActionResult> UpdatePreventive([FromBody] PreventiveCreationDTO upPreventive)
        {
            try
            {
                NobreakPreventive preventive = new NobreakPreventive(upPreventive);

                await _nobreakService.UpdatePreventive(preventive);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Nobreak: " + ex.Message);
            }
        }

        
        [HttpDelete("preventive/{preventiveId}")]
        public async Task<ActionResult> DeletePreventive(int preventiveId, [FromQuery] int deviceId)
        {
            try
            {
                await _nobreakService.DeletePreventive(preventiveId, deviceId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Nobreak: " + ex.Message);
            }
        }
    }
}
