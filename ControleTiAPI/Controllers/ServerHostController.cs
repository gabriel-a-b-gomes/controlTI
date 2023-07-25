using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.DTOs.Preventives;
using ControleTiAPI.DTOs;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models.Preventives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{

    [ApiController]
    [Route("api/servers/hosts")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "EVERYONE")]
    public class ServerHostController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IServerHostService _serverHostService;

        public ServerHostController(IServerHostService serverHostService, DataContext context)
        {
            _serverHostService = serverHostService;
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<ServerHost>>> GetPaginatedServerHosts([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.serverHost.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var hosts = await _serverHostService.GetPaginated(queryable, paginate);

            return Ok(hosts);
        }

        [HttpPost("filter")]
        public async Task<ActionResult<InfoComputerDTO>> GetFilterServer([FromBody] FilterDTO<HostFilterDTO> filter)
        {
            var queryable = _serverHostService.GetFilterServer(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var servers = await _serverHostService.GetPaginated(queryable, filter.paginate);

            return Ok(servers);
        }

        [HttpGet("filterget")]
        public async Task<ActionResult<FilterGetHostDTO>> GetFillServerHostFilter()
        {
            var filterget = await _serverHostService.GetFillServerHostFilter();

            return Ok(filterget);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ServerHost>> GetHostById(int id)
        {
            var host = await _serverHostService.GetDeviceById(id);
            if (host == null)
            {
                return NotFound("Servidor não existe.");
            }

            return Ok(host);
        }

        [HttpGet("infos")]
        public async Task<ActionResult<InfoServerDTO>> GetInfoServer()
        {
            var infos = await _serverHostService.GetInfoServer();

            return Ok(infos);
        }

        [Authorize(Policy = "DEVICES")]
        [HttpGet("formget")]
        public async Task<ActionResult<FormGetServerHostDTO>> GetFillServerHostForm()
        {
            var formget = await _serverHostService.GetFillServerHostForm();

            return Ok(formget);
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPost]
        public async Task<ActionResult> PostHost([FromBody] ServerHostCreationDTO newHostDto)
        {
            try
            {
                var newHost = new ServerHost(newHostDto);

                await _serverHostService.AddDevice(newHost);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("ERRO em Servidor Host > " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPut]
        public async Task<ActionResult> PutHost([FromBody] ServerHostCreationDTO upHostDto)
        {
            try
            {
                var upHost = new ServerHost(upHostDto);

                await _serverHostService.UpdateDevice(upHost);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Servidor Host > " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHost(int id)
        {
            try
            {
                await _serverHostService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Servidor Host > " + ex.Message);
            }
        }


        [HttpGet("preventives/todo")]
        public async Task<ActionResult<List<ServerHost>>> GetHostPreventivesTODO([FromQuery] PaginationDTO paginate)
        {
            var todo = _serverHostService.GetPreventivesTodo();
            await HttpContext.InsertParameterPaginationInHeader(todo);
            var hosts = await _serverHostService.GetPaginatedPreventives(todo, paginate);

            return Ok(hosts);
        }


        [HttpGet("preventives/done")]
        public async Task<ActionResult<List<ServerHost>>> GetHostPreventivesDONE([FromQuery] PaginationDTO paginate)
        {
            var done = _serverHostService.GetPreventivesDone();
            await HttpContext.InsertParameterPaginationInHeader(done);
            var hosts = await _serverHostService.GetPaginatedPreventives(done, paginate);

            return Ok(hosts);
        }


        [HttpPost("preventives/todo/filter")]
        public async Task<ActionResult<List<ServerHost>>> GetHostPreventivesTODOFilter([FromBody] PreventiveFilterDTO preventiveFilter)
        {
            var todo = _serverHostService.GetPreventivesTodo();
            var filter = _serverHostService.GetPreventivesFiltered(todo, preventiveFilter.searches);
            await HttpContext.InsertParameterPaginationInHeader(filter);
            var hosts = await _serverHostService.GetPaginatedPreventives(filter, preventiveFilter.paginate);

            return Ok(hosts);
        }


        [HttpPost("preventives/done/filter")]
        public async Task<ActionResult<List<Computer>>> GetCompPreventivesDONEFilter([FromBody] PreventiveFilterDTO preventiveFilter)
        {
            var done = _serverHostService.GetPreventivesDone();
            var filter = _serverHostService.GetPreventivesFiltered(done, preventiveFilter.searches);
            await HttpContext.InsertParameterPaginationInHeader(filter);
            var hosts = await _serverHostService.GetPaginatedPreventives(filter, preventiveFilter.paginate);

            return Ok(hosts);
        }


        [HttpPost("preventive")]
        public async Task<ActionResult> AddPreventive([FromBody] PreventiveCreationDTO newPreventive)
        {
            try
            {
                ServerPreventive preventive = new ServerPreventive(newPreventive);

                await _serverHostService.AddPreventive(preventive);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Servidor Host > " + ex.Message);
            }
        }


        [HttpPut("preventive")]
        public async Task<ActionResult> UpdatePreventive([FromBody] PreventiveCreationDTO upPreventive)
        {
            try
            {
                ServerPreventive preventive = new ServerPreventive(upPreventive);

                await _serverHostService.UpdatePreventive(preventive);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Servidor Host > " + ex.Message);
            }
        }


        [HttpDelete("preventive/{preventiveId}")]
        public async Task<ActionResult> DeletePreventive(int preventiveId, [FromQuery] int deviceId)
        {
            try
            {
                await _serverHostService.DeletePreventive(preventiveId, deviceId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Computador: " + ex.Message);
            }
        }
    }
}
