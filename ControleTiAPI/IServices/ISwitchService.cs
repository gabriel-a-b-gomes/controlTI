using ControleTiAPI.DTOs.Filters;

namespace ControleTiAPI.IServices
{
    public interface ISwitchService : IDevicesBaseService<Switches>
    {
        IQueryable<Switches> GetSwitchFilter(FilterDTO<SwitchFilterDTO> filter);
    }
}
