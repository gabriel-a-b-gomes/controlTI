using ControleTiAPI.DTOs.Home;
using ControleTiAPI.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/home")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize]
    public class HomeController : Controller
    {
        private readonly IHomeService _homeService;

        public HomeController(IHomeService homeService)
        {
            _homeService = homeService;
        }

        [HttpGet("boxes")]
        public async Task<ActionResult<HomeBoxesDTO>> GetHomeBoxes()
        {
            var boxes = await _homeService.GetHomeBoxes();

            return Ok(boxes);
        }

        [HttpGet("totals")]
        public async Task<ActionResult<TotalBoxesDTO>> GetTotalBoxes()
        {
            var boxes = await _homeService.GetTotalBoxes();

            return Ok(boxes);
        }

        [HttpGet("preventives")]
        public async Task<ActionResult<List<PreventiveIndicatorDTO>>> GetPreventivesIndicator()
        {
            var preventives = await _homeService.GetPreventivesIndicators();

            return Ok(preventives);
        }

        [HttpGet("report")]
        public async Task<ActionResult<List<HomeReportIsGoodDTO>>> GetReportComputers()
        {
            var report = await _homeService.GetReportIsGood();

            return Ok(report);
        }
    }
}
