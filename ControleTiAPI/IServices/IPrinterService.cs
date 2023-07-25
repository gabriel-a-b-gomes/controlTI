using ControleTiAPI.DTOs.Filters;

namespace ControleTiAPI.IServices
{
    public interface IPrinterService : IDevicesBaseService<Printer>
    {
        IQueryable<Printer> GetFilterPrinter(FilterDTO<PrinterFilterDTO> filter);
    }
}
