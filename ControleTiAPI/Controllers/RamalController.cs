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
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using System.Linq;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/ramais")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "DEVICES")]
    public class RamalController : Controller
    {
        private readonly DataContext _context;
        private readonly IRamalService _ramalService;

        public RamalController(IRamalService ramalService, DataContext context)
        {
            _ramalService = ramalService;
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<Ramal>>> GetPaginatedNobreak([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.ramal.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var ramais = await _ramalService.GetPaginated(queryable, paginate);

            return Ok(ramais);
        }       

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Ramal>> GetRamalById(int id)
        {
            var ramal = await _ramalService.GetDeviceById(id);
            if (ramal == null)
            {
                return NotFound("Ramal não encontrado.");
            }

            return Ok(ramal);
        }

        
        [HttpGet("filterget")]
        public async Task<ActionResult<FilterGetRamalDTO>> GetFilterGetRamal()
        {
            var filterGet = await _ramalService.FilterGetRamal();

            return Ok(filterGet);
        }

        
        [HttpPost("filter")]
        public async Task<ActionResult<List<Ramal>>> GetFilterRamal([FromBody] FilterDTO<RamalFilterDTO> filter)
        {
            var queryable = _ramalService.GetFilterRamal(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var ramais = await _ramalService.GetPaginated(queryable, filter.paginate);

            return Ok(ramais);
        }

        [HttpGet("formget")]
        public async Task<ActionResult<FormGetRamalDTO>> GetFormFillRamal()
        {
            var formFill = await _ramalService.FormGet();

            return Ok(formFill);
        }

        [HttpPost]
        public async Task<ActionResult> PostRamal([FromBody] RamalCreationDTO newRamalDto)
        {
            try
            {
                var newRamal = new Ramal(newRamalDto);
                await _ramalService.AddDevice(newRamal);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("ERRO em Ramal: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutRamal([FromBody] RamalCreationDTO upRamalDto)
        {
            try
            {
                var upRamal = new Ramal(upRamalDto);
                await _ramalService.UpdateDevice(upRamal);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("Erro em Ramal: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRamal(int id)
        {
            try
            {
                await _ramalService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Ramal: " + ex.Message);
            }
        }
    }
}
