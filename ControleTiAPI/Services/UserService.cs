using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;

namespace ControleTiAPI.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            this._context = context;
        }

        public async Task<List<User>> GetPaginated(IQueryable<User> queryable, PaginationDTO paginate)
        {
            var users = await queryable
                .Include(u => u.userClaims)
                .OrderBy(u => u.username)
                .AsNoTracking()
                .Paginate(paginate).ToListAsync();

            return users;
        }

        public IQueryable<User> GetUserFilter(FilterDTO filter)
        {
            var users = _context.user.AsQueryable();

            foreach (var searchDTO in filter.searches)
            {
                var s = searchDTO.search.ToLower();

                users = searchDTO.attributte switch
                {
                    "email" => users.Where(u => u.email.Contains(s)),
                    "username" => users.Where(u => u.username.Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            return users;
        }

        public async Task<bool> IsUserAuthenticated(string email)
        {
            var user = await _context.user.AsNoTracking().FirstOrDefaultAsync(u => u.email == email);

            return user != null;
        }

        public async Task<List<UserClaims>> GetUserClaimsByEmail(string email)
        {
            var userClaims = await _context.userClaims
                .Where(u => u.user.email == email)
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();

            return userClaims;
        }

        public async Task<User?> GetUserById(int id)
        {
            var user = await _context.user
                .Include(u => u.userClaims)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.id == id);
            if (user is null) return null;

            return user;
        }

        public async Task<User?> GetUserByEmailWithClaims(string email)
        {
            var user = await _context.user
                .Include(u => u.userClaims)
                .AsNoTrackingWithIdentityResolution()
                .FirstOrDefaultAsync(u => u.email == email);

            return user;
        }

        public async Task AddUser(User newUser)
        {
            try
            {
                if (newUser == null) throw new Exception("Nova inserção não pode ser nula.");

                var uVerify = await _context.user.FirstOrDefaultAsync(u => u.email == newUser.email);

                if (uVerify != null) throw new Exception("Este usuário já está com acesso.");

                await _context.user.AddAsync(newUser);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do Usuário: " + ex.Message);
            }
        }

        public async Task UpdateUser(User updateUser)
        {
            try
            {
                if (updateUser == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var user = await _context.user.Include(u => u.userClaims).FirstOrDefaultAsync(u => u.id == updateUser.id);

                if (user == null) throw new Exception("Usuário não encontrado.");

                var uVerify = await _context.user.FirstOrDefaultAsync(u => u.email == updateUser.email);

                if (uVerify != null && uVerify.id != user.id) throw new Exception("Esse email de alteração já está cadastrado.");

                user.displayname = updateUser.displayname;
                user.username = updateUser.username;
                user.email = updateUser.email;
                user.userIsActive = updateUser.userIsActive;
                user.setUserClaims(updateUser.userClaims);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do Usuário: " + ex.Message);
            }
        }

        public async Task DeleteUser(int id)
        {
            try
            {
                var user = await _context.user.FirstOrDefaultAsync(u => u.id == id);

                if (user == null) throw new Exception("Usuário não encontrado.");

                _context.user.Remove(user);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Usuário: " + ex.Message);
            }
        }
    }
}
