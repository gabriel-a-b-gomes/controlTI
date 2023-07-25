using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;

namespace ControleTiAPI.IServices
{
    public interface INetworkNodeService : IDevicesBaseService<NetworkNode> 
    {
        Task<FormGetNodeDTO> GetFillNodeForm();
        Task<FilterGetNodeDTO> GetFilterFillNode();
        IQueryable<NetworkNode> GetNodeFilter(FilterDTO<NetworkNodeFilterDTO> filter);
    }
}
