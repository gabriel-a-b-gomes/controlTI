using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.Models.Preventives;

namespace ControleTiAPI.IServices
{
    public interface IDVRService : IDevicesBaseService<DVR>, IPreventiveService<DVR, DVRPreventive>
    {
        Task<InfoDVRDTO> GetInfoDVR();
        Task<FilterGetDVRDTO> GetFilterFillDVR();
        IQueryable<DVR> GetFilterDVR(FilterDTO<DVRFilterDTO> filter);
    }
}
