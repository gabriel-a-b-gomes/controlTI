using ControleTiAPI.DTOs.FormGets;

namespace ControleTiAPI.IServices
{
    public interface IServerVMService : IDevicesBaseService<ServerVM>
    {
        Task<FormGetServerVMDTO> GetFillServerVMForm();
    }
}
