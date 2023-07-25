using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
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
    [Route("api/printers")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "DEVICES")]
    public class PrinterController : Controller
    {
        private readonly DataContext _context;
        private readonly IPrinterService _printerService;

        public PrinterController(IPrinterService printerService, DataContext context)
        {
            _printerService = printerService;
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<Printer>>> GetPaginatedPrinter([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.printer.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var printers = await _printerService.GetPaginated(queryable, paginate);

            return Ok(printers);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Printer>> GetPrinterById(int id)
        {
            var printer = await _printerService.GetDeviceById(id);
            if (printer == null)
            {
                return NotFound("Nobreak não existe.");
            }

            return Ok(printer);
        }

        
        [HttpPost("filter")]
        public async Task<ActionResult<List<Printer>>> GetFilterPrinter([FromBody] FilterDTO<PrinterFilterDTO> filter)
        {
            var queryable = _printerService.GetFilterPrinter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var printers = await _printerService.GetPaginated(queryable, filter.paginate);

            return Ok(printers);
        }

        [HttpPost]
        public async Task<ActionResult> PostPrinter([FromBody] Printer newPrinter)
        {
            try
            {
                await _printerService.AddDevice(newPrinter);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("ERRO em Impressora: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutPrinter([FromBody] Printer upPrinter)
        {
            try
            {
                await _printerService.UpdateDevice(upPrinter);

                return Ok();
            } 
            catch (Exception ex)
            {
                return BadRequest("Erro em Impressora: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePrinter(int id)
        {
            try
            {
                await _printerService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Impressora: " + ex.Message);
            }
        }
    }
}
