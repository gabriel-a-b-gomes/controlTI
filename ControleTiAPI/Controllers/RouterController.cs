using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.FilterGets;
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
    [Route("api/routers")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "DEVICES")]
    public class RouterController : Controller
    {
        private readonly DataContext _context;
        private readonly IRouterService _routerService;

        public RouterController(IRouterService routerService, DataContext context)
        {
            _routerService = routerService;
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<Router>>> GetPaginatedNobreak([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.router.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var routers = await _routerService.GetPaginated(queryable, paginate);

            return Ok(routers);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Router>> GetRouterById(int id)
        {
            var router = await _routerService.GetDeviceById(id);
            if (router == null)
            {
                return NotFound("Roteador não existe.");
            }

            return Ok(router);
        }

        
        [HttpGet("filterget")]
        public async Task<ActionResult<FilterGetRouterDTO>> GetFilterFillRouter()
        {
            var filterget = await _routerService.GetFilterFillRouter();

            return Ok(filterget);
        }

        
        [HttpPost("filter")]
        public async Task<ActionResult<List<Router>>> GetFilterRouter([FromBody] FilterDTO<RouterFilterDTO> filter)
        {
            var queryable = _routerService.GetFilterRouter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var routers = await _routerService.GetPaginated(queryable, filter.paginate);

            return Ok(routers);
        }

        [HttpPost]
        public async Task<ActionResult> PostRouter([FromBody] Router newRouter)
        {
            try
            {
                await _routerService.AddDevice(newRouter);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("ERRO em Roteador: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutRouter([FromBody] Router upRouter)
        {
            try
            {
                await _routerService.UpdateDevice(upRouter);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("Erro em Roteador: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRouter(int id)
        {
            try
            {
                await _routerService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Roteador: " + ex.Message);
            }
        }
    }
}
