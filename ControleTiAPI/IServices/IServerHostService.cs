using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.Models.Preventives;

namespace ControleTiAPI.IServices
{
    public interface IServerHostService : IDevicesBaseService<ServerHost>, IPreventiveService<ServerHost, ServerPreventive>
    {
        Task<InfoServerDTO> GetInfoServer();
        Task<FormGetServerHostDTO> GetFillServerHostForm();
        IQueryable<ServerHost> GetFilterServer(FilterDTO<HostFilterDTO> filter);
        Task<FilterGetHostDTO> GetFillServerHostFilter();
    }
}
