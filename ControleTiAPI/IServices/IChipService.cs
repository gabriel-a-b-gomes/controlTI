using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.DTOs.Infos;

namespace ControleTiAPI.IServices
{
    public interface IChipService : IDevicesBaseService<Chip>
    {
        Task<FormGetChipDTO> FormGetChip();
        Task<FilterGetChipDTO> GetFilterFillChip();
        Task<InfoChipDTO> GetInfoChip();
        IQueryable<Chip> GetFilterChip(FilterDTO<ChipFilterDTO> filter);
    }
}
