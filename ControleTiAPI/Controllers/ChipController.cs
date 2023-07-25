using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/chips")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "DEVICES")]
    public class ChipController : Controller
    {
        private readonly DataContext _context;
        private readonly IChipService _chipService;

        public ChipController(DataContext context, IChipService chipService)
        {
            _context = context;
            _chipService = chipService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Chip>>> GetPaginatedChips([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.chip.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var chips = await _chipService.GetPaginated(queryable, paginate);

            return Ok(chips);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Chip>> GetChipById(int id)
        {
            var chip = await _chipService.GetDeviceById(id);
            if (chip == null)
            {
                return NotFound("Chip não encontrado.");
            }

            return Ok(chip);
        }

        [HttpGet("infos")]
        public async Task<ActionResult<InfoChipDTO>> GetInfoChip()
        {
            var infos = await _chipService.GetInfoChip();

            return Ok(infos);
        }

        [HttpGet("filterget")]
        public async Task<ActionResult<FilterGetChipDTO>> GetFilterFillChip()
        {
            var filterget = await _chipService.GetFilterFillChip();

            return Ok(filterget);
        }

        [HttpPost("filter")]
        public async Task<ActionResult<List<Chip>>> GetFilterChip([FromBody] FilterDTO<ChipFilterDTO> filter)
        {
            var queryable = _chipService.GetFilterChip(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var chips = await _chipService.GetPaginated(queryable, filter.paginate);

            return Ok(chips);
        }

        [HttpGet("formget")]
        public async Task<ActionResult<FormGetChipDTO>> FormGetChip()
        {
            var formget = await _chipService.FormGetChip();

            return Ok(formget);
        }

        [HttpPost]
        public async Task<ActionResult> PostChip([FromBody] ChipCreationDTO newChipDto)
        {
            try
            {
                var newChip = new Chip(newChipDto);

                await _chipService.AddDevice(newChip);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("ERRO em Chip: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutChip([FromBody] ChipCreationDTO upChipDto)
        {
            try
            {
                var upChip = new Chip(upChipDto);

                await _chipService.UpdateDevice(upChip);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("Erro em Chip: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteChip(int id)
        {
            try
            {
                await _chipService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Chip: " + ex.Message);
            }
        }
    }
}
