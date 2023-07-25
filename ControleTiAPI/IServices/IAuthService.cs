using ControleTiAPI.DTOs;

namespace ControleTiAPI.IServices
{
    public interface IAuthService
    {
        string Name { get; }
        int GetUserId();
        string GetUserEmail();
        string GetUserWinAccount();
        string GetUserDisplayName();
        bool IsAuthenticated();
        string GetClaimValue(string key);
    }
}
