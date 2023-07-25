using ControleTiAPI.DTOs.Infos;

namespace ControleTiAPI.IServices
{
    public interface INetworkDeviceService
    {
        Task<InfoNetDevicesDTO> GetInfoNetDevices();
    }
}
