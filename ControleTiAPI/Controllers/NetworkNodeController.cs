using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/networknodes")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "DEVICES")]
    public class NetworkNodeController : Controller
    {
        private readonly DataContext _context;
        private readonly INetworkNodeService _networkNodeService;

        public NetworkNodeController(INetworkNodeService networkNodeService, DataContext context)
        {
            _networkNodeService = networkNodeService;
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<NetworkNode>>> GetPaginatedNodes([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.networkNode.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var networkNodes = await _networkNodeService.GetPaginated(queryable, paginate);

            return Ok(networkNodes);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<NetworkNode>> GetNetworkNode(int id)
        {
            var networkNode = await _networkNodeService.GetDeviceById(id);
            if (networkNode == null)
            {
                return NotFound("Ponto de rede não existe.");
            }

            return Ok(networkNode);
        }

        
        [HttpGet("filterget")]
        public async Task<ActionResult<FilterGetNodeDTO>> GetFilterFillNode()
        {
            var fill = await _networkNodeService.GetFilterFillNode();

            return Ok(fill);
        }

        
        [HttpPost("filter")]
        public async Task<ActionResult<List<NetworkNode>>> GetNodeFilter([FromBody] FilterDTO<NetworkNodeFilterDTO> filter)
        {
            var queryable = _networkNodeService.GetNodeFilter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var networkNodes = await _networkNodeService.GetPaginated(queryable, filter.paginate);

            return Ok(networkNodes);
        }

        [HttpGet("postget")]
        public async Task<ActionResult<FormGetNodeDTO>> GetPostGetNode()
        {
            var fill = await _networkNodeService.GetFillNodeForm();

            return Ok(fill);
        }

        [HttpPost]
        public async Task<ActionResult> PostNetworkNode([FromBody] NetworkNodeCreationDTO newNetwotkNodeDto)
        {
            try
            {
                var newNetworkNode = new NetworkNode(newNetwotkNodeDto);

                await _networkNodeService.AddDevice(newNetworkNode);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("ERRO em Ponto de Rede: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutNetworkNode([FromBody] NetworkNodeCreationDTO upNetworkNodeDto)
        {
            try
            {
                var upNetworkNode = new NetworkNode(upNetworkNodeDto);

                await _networkNodeService.UpdateDevice(upNetworkNode);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("Erro em Ponto de Rede: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNetworkNode(int id)
        {
            try
            {
                await _networkNodeService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Ponto de rede: " + ex.Message);
            }
        }
    }
}
