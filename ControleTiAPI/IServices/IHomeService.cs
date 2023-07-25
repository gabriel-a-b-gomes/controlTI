using ControleTiAPI.DTOs.Home;

namespace ControleTiAPI.IServices
{
    public interface IHomeService
    {
        Task<HomeBoxesDTO> GetHomeBoxes();
        Task<List<PreventiveIndicatorDTO>> GetPreventivesIndicators();
        Task<TotalBoxesDTO> GetTotalBoxes();
        Task<List<HomeReportIsGoodDTO>> GetReportIsGood();
    }
}
