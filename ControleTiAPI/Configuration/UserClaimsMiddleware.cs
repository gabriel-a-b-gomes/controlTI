using ControleTiAPI.IServices;
using System.Net;
using System.Security.Claims;

namespace ControleTiAPI.Configuration
{
    public class UserClaimsMiddleware
    {
        private readonly RequestDelegate _next;

        public UserClaimsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.User.Identity is not null
                && context.User.Identity.IsAuthenticated)
            {
                string userEmail = context.User.Identity.Name!;

                var claims = new List<Claim>();

                var user = await context.RequestServices.GetRequiredService<IUserService>().GetUserByEmailWithClaims(userEmail!);

                if (!(user == null || !user.userIsActive))
                {
                    claims.Add(new Claim(ClaimTypes.Email, user.email));
                    claims.Add(new Claim(ClaimTypes.UserData, user.id.ToString()));
                    claims.Add(new Claim(ClaimTypes.WindowsAccountName, user.username));
                    claims.Add(new Claim(ClaimTypes.GivenName, user.displayname));

                    foreach (var userclaim in user.userClaims)
                    {
                        var values = userclaim.claimValue.Split(',');

                        foreach (var clmsVl in values)
                        {
                            claims.Add(new Claim(userclaim.claimType, clmsVl));
                        } 
                    }

                    var appIdentity = new ClaimsIdentity(claims);
                    context.User.AddIdentity(appIdentity);
                } 
                else
                {
                    context.Response.Clear();
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;

                    return;
                }
            }

            // Call the next delegate/middleware in the pipeline.
            await _next(context);
        }
    }


    public static class UserClaimsMiddlewareExtensions
    {
        public static IApplicationBuilder UseUserClaimsMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserClaimsMiddleware>();
        }
    }
    
}
