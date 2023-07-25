using ControleTiAPI.DTOs;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Linq;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/ping")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "EVERYONE")]
    public class PingController : Controller
    {
        private readonly IPingService _pingService;

        public PingController(IPingService pingService)
        {
            _pingService = pingService;
        }

        [HttpGet("{orderby}/{asc}")]
        public async Task<ActionResult<List<PingDTO>>> GetPings([FromQuery] string? search, int orderby = 0, int asc = 1)
        {
            var pings = await _pingService.GetPingGeneralList(search, orderby, asc);

            return Ok(pings);
        }

        [HttpGet("computer/{orderby}/{asc}")]
        public async Task<ActionResult<List<PingDTO>>> GetComputerPings([FromQuery] string? search, int orderby = 0, int asc = 1)
        {
            var pings = await _pingService.GetPingComputersList(search, orderby, asc);

            return Ok(pings);
        }

        [HttpGet("ramal/{orderby}/{asc}")]
        public async Task<ActionResult<List<PingDTO>>> GetRamalPings([FromQuery] string? search, int orderby = 0, int asc = 1)
        {
            var pings = await _pingService.GetPingRamalsList(search, orderby, asc);

            return Ok(pings);
        }

        [HttpGet("server/{orderby}/{asc}")]
        public async Task<ActionResult<List<PingDTO>>> GetServerPings([FromQuery] string? search, int orderby = 0, int asc = 1)
        {
            var pings = await _pingService.GetPingServerList(search, orderby, asc);

            return Ok(pings);
        }
    }
}
