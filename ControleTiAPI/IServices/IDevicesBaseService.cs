using ControleTiAPI.DTOs;

namespace ControleTiAPI.IServices
{
    public interface IDevicesBaseService<T>
    {
        Task<List<T>> GetPaginated(IQueryable<T> queryable, PaginationDTO paginate);
        Task<T?> GetDeviceById(int id);
        Task AddDevice(T device);
        Task UpdateDevice(T device);
        Task DeleteDevice(int id);
    }
}
