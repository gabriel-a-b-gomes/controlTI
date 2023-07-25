using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ControleTiAPI.Controllers
{
    [Route("api/profiles")]
    [ApiController]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "ADMIN")]
    public class ProfileController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService, DataContext context)
        {
            _profileService = profileService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ComputerProfile>>> GetPaginatedProfile([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.profile.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var profiles = await _profileService.GetPaginated(queryable, paginate);

            return Ok(profiles);
        }

        [HttpPost("filter")]
        public async Task<ActionResult<List<ComputerProfile>>> GetProfilesFilter([FromBody] FilterDTO filter)
        {
            var queryable = _profileService.GetProfilesFilter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var profiles = await _profileService.GetPaginated(queryable, filter.paginate);

            return Ok(profiles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ComputerProfile>> GetProfileById(int id)
        {
            var profile = await _profileService.GetDeviceById(id);
            if (profile == null)
            {
                return NotFound("Perfil de uso não existe.");
            }

            return Ok(profile);
        }

        [HttpPost]
        public async Task<ActionResult> PostProfile([FromBody] ComputerProfile newProfile)
        {
            try
            {
                await _profileService.AddDevice(newProfile);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("ERRO em Perfil de uso: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutProfile([FromBody] ComputerProfile upProfile)
        {
            try
            {
                await _profileService.UpdateDevice(upProfile);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Perfil de uso: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProfile(int id)
        {
            try
            {
                await _profileService.DeleteDevice(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Perfil de uso: " + ex.Message);
            }
        }
    }
}
