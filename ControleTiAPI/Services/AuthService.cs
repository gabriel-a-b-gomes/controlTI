using ControleTiAPI.DTOs;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;

namespace ControleTiAPI.Services
{
    public class AuthService : IAuthService
    {
        
        private readonly IHttpContextAccessor _accessor;

        public AuthService(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public string Name => _accessor.HttpContext!.User.Identity!.Name!;

        public int GetUserId()
        {
            return IsAuthenticated() ? int.Parse(_accessor.HttpContext!.User.GetUserId()) : 0;
        }

        public string GetUserEmail()
        {
            return IsAuthenticated() ? _accessor.HttpContext!.User.GetUserEmail() : "";
        }

        public string GetUserWinAccount()
        {
            return IsAuthenticated() ? _accessor.HttpContext!.User.GetUserWinAccount() : "";
        }

        public string GetUserDisplayName()
        {
            return IsAuthenticated() ? _accessor.HttpContext!.User.GetUserDisplayName() : "";
        }

        public string GetClaimValue(string key)
        {
            return _accessor.HttpContext!.User.GetClaimValue(key);
        }

        public bool IsAuthenticated()
        {
            return _accessor.HttpContext!.User.Identity!.IsAuthenticated;
        }
    
    
    }
}
