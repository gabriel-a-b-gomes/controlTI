using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;

namespace ControleTiAPI.IServices
{
    public interface IRouterService : IDevicesBaseService<Router>
    {
        Task<FilterGetRouterDTO> GetFilterFillRouter();
        IQueryable<Router> GetFilterRouter(FilterDTO<RouterFilterDTO> filter);
    }
}
