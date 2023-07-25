using ControleTiAPI.DTOs.Filters;

namespace ControleTiAPI.IServices
{
    public interface IFunctionalityService : IDevicesBaseService<ServerFunctionality>
    {
        IQueryable<ServerFunctionality> GetFunctionalitiesFilter(FilterDTO filter);
    }
}
