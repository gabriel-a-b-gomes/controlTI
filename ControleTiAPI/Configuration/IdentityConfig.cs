using ControleTiAPI.IServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace ControleTiAPI.Configuration
{
    public class IdentityConfig
    {
        public static async Task OnTokenValidatedFunc(TokenValidatedContext context)
        {
            string userEmail = context.Principal.Identity.Name;

            var claims = new List<Claim>();

            var user = await context.HttpContext.RequestServices.GetRequiredService<IUserService>().GetUserByEmailWithClaims(userEmail!);

            if (user == null || !user.userIsActive)
            {
                context.Fail("Não está autorizado");
                return;
            }
            
            claims.Add(new Claim(ClaimTypes.Email, user.email));
            claims.Add(new Claim(ClaimTypes.UserData, user.id.ToString()));
            claims.Add(new Claim(ClaimTypes.WindowsAccountName, user.username));
            claims.Add(new Claim(ClaimTypes.Name, user.displayname));

            foreach (var userclaim in user.userClaims)
            {
                claims.Add(new Claim(userclaim.claimType, userclaim.claimValue));
            }

            var appIdentity = new ClaimsIdentity(claims);
            context.Principal.AddIdentity(appIdentity);

            await Task.CompletedTask.ConfigureAwait(false);
        }
    }
}
