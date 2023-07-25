using ControleTiAPI.DTOs;
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
    [Route("api/servers/vms")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "EVERYONE")]
    public class ServerVMController : Controller
    {
        private readonly DataContext _context;
        private readonly IServerVMService _serverVMService;

        public ServerVMController(IServerVMService serverVMService, DataContext context)
        {
            _serverVMService = serverVMService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ServerVM>>> GetPaginatedVMs([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.serverVM.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var vms = await _serverVMService.GetPaginated(queryable, paginate);

            return Ok(vms);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServerVM>> GetFunctionalityById(int id)
        {
            var vm = await _serverVMService.GetDeviceById(id);
            if (vm == null)
            {
                return NotFound("Máquina Virtual não existe.");
            }

            return Ok(vm);
        }

        [Authorize(Policy = "DEVICES")]
        [HttpGet("formget")]
        public async Task<ActionResult<FormGetServerVMDTO>> GetFillServerVMForm()
        {
            var formget = await _serverVMService.GetFillServerVMForm();

            return Ok(formget);
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPost]
        public async Task<ActionResult> PostVM([FromBody] ServerVMCreationDTO newVirtualMachine)
        {
            try
            {
                ServerVM newVM = new ServerVM(newVirtualMachine);
                await _serverVMService.AddDevice(newVM);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("ERRO em Máquina Virtual > " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpPut]
        public async Task<ActionResult> PutVM([FromBody] ServerVMCreationDTO upVirtualMachine)
        {
            try
            {
                ServerVM upVM = new ServerVM(upVirtualMachine);
                await _serverVMService.UpdateDevice(upVM);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Máquina Virtual > " + ex.Message);
            }
        }

        [Authorize(Policy = "DEVICES")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVM(int id)
        {
            try
            {
                await _serverVMService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Máquina Virtual > " + ex.Message);
            }
        }
    }
}
