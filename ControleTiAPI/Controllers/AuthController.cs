using ControleTiAPI.DTOs;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Security.Policy;

namespace ControleTiAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<UserAuthenticatedDTO> GetAuthUserDetails()
        {
            var userAuth = new UserAuthenticatedDTO();
            userAuth.isAuthenticated = _authService.IsAuthenticated();
            userAuth.id = _authService.GetUserId();
            userAuth.displayName = _authService.GetUserDisplayName();
            userAuth.userName = _authService.GetUserWinAccount();
            userAuth.userEmail = _authService.GetUserEmail();
            userAuth.roles = _authService.GetClaimValue("ROLE");

            return Ok(userAuth);
        }
    }
}
