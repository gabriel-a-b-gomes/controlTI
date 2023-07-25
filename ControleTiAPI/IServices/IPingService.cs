using ControleTiAPI.DTOs;

namespace ControleTiAPI.IServices
{
    public interface IPingService
    {
        Task<List<PingDTO>> GetPingGeneralList(string? search, int orderby, int asc);
        Task<List<PingDTO>> GetPingComputersList(string? search, int orderby, int asc);
        Task<List<PingDTO>> GetPingRamalsList(string? search, int orderby, int asc);
        Task<List<PingDTO>> GetPingServerList(string? search, int orderby, int asc);
    }
}
