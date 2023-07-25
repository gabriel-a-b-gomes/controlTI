using ControleTiAPI.DTOs.Filters;

namespace ControleTiAPI.IServices
{
    public interface IProfileService : IDevicesBaseService<ComputerProfile>
    {
        Task<List<ComputerProfile>> GetProfiles();
        IQueryable<ComputerProfile> GetProfilesFilter(FilterDTO filter);
    }
}
