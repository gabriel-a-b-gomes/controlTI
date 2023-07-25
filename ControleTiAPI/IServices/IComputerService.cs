using ControleTiAPI.DTOs.Charts;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.Models.Preventives;

namespace ControleTiAPI.IServices
{
    public interface IComputerService : IDevicesBaseService<Computer>, IPreventiveService<Computer, ComputerPreventive>
    {
        Task AddComputerLog(Computer computer);
        Task<FormGetComputerDTO> FormGetComputer();
        Task<FilterGetComputerDTO> FilterGetComputer();
        Task<InfoComputerDTO> GetInfoComputer();
        Task<ChartComputerDTO> GetChartComputer(IQueryable<Computer> computers);
        IQueryable<Computer> GetFilterComputer(FilterDTO<ComputerFilterDTO> filter);
    }
}
