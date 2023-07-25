using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;

namespace ControleTiAPI.IServices
{
    public interface IUserService
    {
        Task<List<UserClaims>> GetUserClaimsByEmail(string email);

        Task<List<User>> GetPaginated(IQueryable<User> queryable, PaginationDTO paginate);
        IQueryable<User> GetUserFilter(FilterDTO filter);
        Task<bool> IsUserAuthenticated(string email);
        Task<User?> GetUserByEmailWithClaims(string email);
        Task<User?> GetUserById(int id);
        Task AddUser(User newUser);
        Task UpdateUser(User updateUser);
        Task DeleteUser(int id);
    }
}
