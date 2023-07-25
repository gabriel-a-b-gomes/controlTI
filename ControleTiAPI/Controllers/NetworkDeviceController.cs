using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ControleTiAPI.Controllers
{
    [Route("api/network/devices")]
    [ApiController]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "EVERYONE")]
    public class NetworkDeviceController : ControllerBase
    {
        private readonly INetworkDeviceService _networkDeviceService;

        public NetworkDeviceController(INetworkDeviceService networkDeviceService)
        {
            _networkDeviceService = networkDeviceService;
        }

        [HttpGet("infos")]
        public async Task<ActionResult<InfoNetDevicesDTO>> GetInfoNetworkDevice()
        {
            var infos = await _networkDeviceService.GetInfoNetDevices();

            return Ok(infos);
        }
    }
}
