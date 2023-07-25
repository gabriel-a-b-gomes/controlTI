using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.DTOs.Preventives;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models.Preventives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/dvrs")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "EVERYONE")]
    public class DVRController : Controller
    {
        private readonly DataContext _context;
        private readonly IDVRService _dvrService;

        public DVRController(IDVRService dvrService, DataContext context)
        {
            _dvrService = dvrService;
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<DVR>>> GetPaginatedDVR([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.dvr.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var dvrs = await _dvrService.GetPaginated(queryable, paginate);

            return Ok(dvrs);
        }

        
        [HttpGet("filterget")]
        public async Task<ActionResult<InfoDVRDTO>> GetFilterFillDVR()
        {
            var filterget = await _dvrService.GetFilterFillDVR();

            return Ok(filterget);
        }

        
        [HttpPost("filter")]
        public async Task<ActionResult<List<DVR>>> GetFilterDVR([FromBody] FilterDTO<DVRFilterDTO> filter)
        {
            var queryable = _dvrService.GetFilterDVR(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var dvrs = await _dvrService.GetPaginated(queryable, filter.paginate);

            return Ok(dvrs);
        }

        
        [HttpGet("infos")]
        public async Task<ActionResult<InfoDVRDTO>> GetInfoDVR()
        {
            var infos = await _dvrService.GetInfoDVR();

            return Ok(infos);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<DVR>> GetDVRById(int id)
        {
            var dvr = await _dvrService.GetDeviceById(id);
            if (dvr == null)
            {
                return NotFound("DVR não existe.");
            }

            return Ok(dvr);
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPost]
        public async Task<ActionResult> PostDVR([FromBody] DVRCreationDTO newDVR)
        {
            try
            {
                DVR dvr = new DVR(newDVR);

                await _dvrService.AddDevice(dvr);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("ERRO em DVR: " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPut]
        public async Task<ActionResult> PutDVR([FromBody] DVRCreationDTO upDVR)
        {
            try
            {
                DVR dvr = new DVR(upDVR);

                await _dvrService.UpdateDevice(dvr);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("Erro em DVR: " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDVR(int id)
        {
            try
            {
                await _dvrService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em DVR: " + ex.Message);
            }
        }

        
        [HttpGet("preventives/todo")]
        public async Task<ActionResult<List<DVR>>> GetDVRPreventivesTODO([FromQuery] PaginationDTO paginate)
        {
            var todo = _dvrService.GetPreventivesTodo();
            await HttpContext.InsertParameterPaginationInHeader(todo);
            var dvrs = await _dvrService.GetPaginatedPreventives(todo, paginate);

            return Ok(dvrs);
        }

        
        [HttpGet("preventives/done")]
        public async Task<ActionResult<List<DVR>>> GetDVRPreventivesDONE([FromQuery] PaginationDTO paginate)
        {
            var done = _dvrService.GetPreventivesDone();
            await HttpContext.InsertParameterPaginationInHeader(done);
            var dvrs = await _dvrService.GetPaginatedPreventives(done, paginate);

            return Ok(dvrs);
        }

        
        [HttpPost("preventives/todo/filter")]
        public async Task<ActionResult<List<DVR>>> GetDVRPreventivesTODOFilter([FromBody] PreventiveFilterDTO preventiveFilter)
        {
            var todo = _dvrService.GetPreventivesTodo();
            var filter = _dvrService.GetPreventivesFiltered(todo, preventiveFilter.searches);
            await HttpContext.InsertParameterPaginationInHeader(filter);
            var dvrs = await _dvrService.GetPaginatedPreventives(filter, preventiveFilter.paginate);

            return Ok(dvrs);
        }

        
        [HttpPost("preventives/done/filter")]
        public async Task<ActionResult<List<DVR>>> GetDVRPreventivesDONEFilter([FromBody] PreventiveFilterDTO preventiveFilter)
        {
            var done = _dvrService.GetPreventivesDone();
            var filter = _dvrService.GetPreventivesFiltered(done, preventiveFilter.searches);
            await HttpContext.InsertParameterPaginationInHeader(filter);
            var dvrs = await _dvrService.GetPaginatedPreventives(filter, preventiveFilter.paginate);

            return Ok(dvrs);
        }

        
        [HttpPost("preventive")]
        public async Task<ActionResult> AddPreventive([FromBody] PreventiveCreationDTO newPreventive)
        {
            try
            {
                DVRPreventive preventive = new DVRPreventive(newPreventive);

                await _dvrService.AddPreventive(preventive);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em DVR: " + ex.Message);
            }
        }

        
        [HttpPut("preventive")]
        public async Task<ActionResult> UpdatePreventive([FromBody] PreventiveCreationDTO upPreventive)
        {
            try
            {
                DVRPreventive preventive = new DVRPreventive(upPreventive);

                await _dvrService.UpdatePreventive(preventive);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em DVR: " + ex.Message);
            }
        }

        
        [HttpDelete("preventive/{preventiveId}")]
        public async Task<ActionResult> DeletePreventive(int preventiveId, [FromQuery] int deviceId)
        {
            try
            {
                await _dvrService.DeletePreventive(preventiveId, deviceId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em DVR: " + ex.Message);
            }
        }
    }
}
