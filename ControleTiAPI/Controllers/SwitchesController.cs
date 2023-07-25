using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/switches")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "DEVICES")]
    public class SwitchesController : Controller
    {
        private readonly DataContext _context;
        private readonly ISwitchService _switchService;

        public SwitchesController(ISwitchService switchService, DataContext context)
        {
            _switchService = switchService;
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<Switches>>> GetPaginatedNobreak([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.switches.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var switches = await _switchService.GetPaginated(queryable, paginate);

            return Ok(switches);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Switches>> GetSwitchById(int id)
        {
            var sSwitch = await _switchService.GetDeviceById(id);
            if (sSwitch == null)
            {
                return NotFound("Switch não existe.");
            }

            return Ok(sSwitch);
        }

        
        [HttpPost("filter")]
        public async Task<ActionResult<List<Switches>>> GetSwitchFilter([FromBody] FilterDTO<SwitchFilterDTO> filter)
        {
            var queryable = _switchService.GetSwitchFilter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var switches = await _switchService.GetPaginated(queryable, filter.paginate);

            return Ok(switches);
        }

        [HttpPost]
        public async Task<ActionResult> PostSwitch([FromBody] Switches newSwitch)
        {
            try
            {
                await _switchService.AddDevice(newSwitch);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("ERRO em Switch: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutSwitch([FromBody] Switches upSwitch)
        {
            try
            {
                await _switchService.UpdateDevice(upSwitch);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("Erro em Switch: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSwitch(int id)
        {
            try
            {
                await _switchService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Switch: " + ex.Message);
            }
        }
    }
}
