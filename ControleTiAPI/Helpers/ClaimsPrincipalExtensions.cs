using ControleTiAPI.DTOs;
using ControleTiAPI.IServices;
using System.Security.Claims;

namespace ControleTiAPI.Helpers
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentException(nameof(principal));
            }

            var claim = principal.FindFirst(ClaimTypes.UserData);

            return claim?.Value!;
        }

        public static string GetUserEmail(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentException(nameof(principal));
            }

            var claim = principal.FindFirst(ClaimTypes.Email);
            return claim?.Value!;
        }

        public static string GetUserWinAccount(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentException(nameof(principal));
            }

            var claim = principal.FindFirst(ClaimTypes.WindowsAccountName);
            return claim?.Value!;
        }

        public static string GetUserDisplayName(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentException(nameof(principal));
            }

            var claim = principal.FindFirst(ClaimTypes.GivenName);
            return claim?.Value!;
        }


        public static string GetClaimValue(this ClaimsPrincipal principal, string key)
        {
            if (principal == null)
            {
                throw new ArgumentException(nameof(principal));
            }

            var roleValues = "";

            var claims = principal.FindAll(c => c.Type == key);

            foreach (var claim in claims)
            {
                roleValues += claim.Value + ',';
            }
            
            return roleValues;
        }
    }
}
