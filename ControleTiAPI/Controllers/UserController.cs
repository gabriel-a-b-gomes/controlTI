using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.Helpers.AAD;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;
using ControleTiAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Identity.Web.Resource;
using System.Diagnostics;

namespace ControleTiAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
    [Authorize(Policy = "ADMIN")]
    public class UserController : Controller
    {
        private readonly DataContext _context;
        private readonly IUserService _userService;

        public UserController(IUserService userService, DataContext context)
        {
            _userService = userService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetPaginatedUser([FromQuery] PaginationDTO paginate)
        {
            var queryable = _context.user.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var users = await _userService.GetPaginated(queryable, paginate);

            return Ok(users);
        }

        [HttpPost("filter")]
        public async Task<ActionResult<List<User>>> GetFilterUser([FromBody] FilterDTO filter)
        {
            var queryable = _userService.GetUserFilter(filter);
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var users = await _userService.GetPaginated(queryable, filter.paginate);

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetSingleUser(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user is null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserCreationDTO newUserDto)
        {
            try
            {
                var newUser = new User(newUserDto);
                await _userService.AddUser(newUser);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("ERRO em Usuário: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<User>> Put([FromBody] UserCreationDTO upUserDto)
        {
            try
            {
                var updateUser = new User(upUserDto);
                await _userService.UpdateUser(updateUser);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Usuário: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            try
            {
                await _userService.DeleteUser(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Erro em Usuário: " + ex.Message);
            }
        }
    }
}
