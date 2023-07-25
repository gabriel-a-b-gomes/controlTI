using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;

namespace ControleTiAPI.IServices
{
    public interface IRamalService : IDevicesBaseService<Ramal>
    {
        public Task<FormGetRamalDTO> FormGet();
        public Task<FilterGetRamalDTO> FilterGetRamal();
        public IQueryable<Ramal> GetFilterRamal(FilterDTO<RamalFilterDTO> filter);
    }
}
