using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Models.Preventives;

namespace ControleTiAPI.IServices
{
    public interface INobreakService : IDevicesBaseService<Nobreak>, IPreventiveService<Nobreak, NobreakPreventive>
    { 
        IQueryable<Nobreak> GetFilterNobreak(FilterDTO<NobreakFilterDTO> filter);
    }
}
