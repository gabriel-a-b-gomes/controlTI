using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Preventives;

namespace ControleTiAPI.IServices
{
    public interface IPreventiveService<T, TPreventive>
    {
        Task<PreventiveDeviceReportDTO> GetPreventiveReport();
        IQueryable<T> GetPreventivesTodo();
        IQueryable<T> GetPreventivesDone();
        IQueryable<T> GetPreventivesFiltered(IQueryable<T> queryable, ICollection<string> searches);    
        Task<List<T>> GetPaginatedPreventives(IQueryable<T> queryable, PaginationDTO paginate);
        Task AddPreventive(TPreventive newPreventive);
        Task UpdatePreventive(TPreventive upPreventive);
        Task DeletePreventive(int preventiveId, int deviceId);
    }
}
