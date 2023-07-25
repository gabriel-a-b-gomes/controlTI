using ControleTiAPI.DTOs.Preventives;
using ControleTiAPI.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/reports")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "EVERYONE")]
    public class ReportsController : Controller
    {
        private readonly IComputerService _computerService;
        private readonly IDVRService _dvrService;
        private readonly INobreakService _nobreakService;
        private readonly IServerHostService _serverHostService;

        public ReportsController(IComputerService computerService, IDVRService dvrService, INobreakService nobreakService, IServerHostService serverHostService)
        {
            _computerService = computerService;
            _dvrService = dvrService;
            _nobreakService = nobreakService;
            _serverHostService = serverHostService;
        }

        [HttpGet("preventives")]
        public async Task<ActionResult<PreventiveReportDTO>> GetPreventiveReport()
        {
            try
            {
                var computers = await _computerService.GetPreventiveReport();
                var nobreak = await _nobreakService.GetPreventiveReport();
                var dvr = await _dvrService.GetPreventiveReport();
                var server = await _serverHostService.GetPreventiveReport();

                var report = new PreventiveReportDTO(computers, dvr, nobreak, server);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest("ERRO no relatório da preventiva: " + ex.Message);
            }
            
        }
    }
}
