using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/funcs")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "ADMIN")]
    public class FunctionalitiesController : Controller
    {
        private readonly DataContext _context;
        private readonly IFunctionalityService _functionalitiesService;

        public FunctionalitiesController(IFunctionalityService functionalityService, DataContext context)
        {
            _functionalitiesService = functionalityService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ServerFunctionality>>> GetPaginatedFunctionalities([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.serverFunctionality.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var funcs = await _functionalitiesService.GetPaginated(queryable, paginate);

            return Ok(funcs);
        }

        [HttpPost("filter")]
        public async Task<ActionResult<List<ServerFunctionality>>> GetFunctionalitiesFilter([FromBody] FilterDTO filter)
        {
            var queryable = _functionalitiesService.GetFunctionalitiesFilter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var funcs = await _functionalitiesService.GetPaginated(queryable, filter.paginate);

            return Ok(funcs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetFunctionalityById(int id)
        {
            var func = await _functionalitiesService.GetDeviceById(id);
            if (func == null)
            {
                return NotFound("Funcionalidade não existe.");
            }

            return Ok(func);
        }

        [HttpPost]
        public async Task<ActionResult> PostFunctionality([FromBody] ServerFunctionality newFunctionality)
        {
            try
            {
                await _functionalitiesService.AddDevice(newFunctionality);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("ERRO em Funcionalidades > " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutFunctionality([FromBody] ServerFunctionality upFunctionality)
        {
            try
            {
                await _functionalitiesService.UpdateDevice(upFunctionality);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Funcionalidades > " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFunctionality(int id)
        {
            try
            {
                await _functionalitiesService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Functionality > " + ex.Message);
            }
        }
    }
}