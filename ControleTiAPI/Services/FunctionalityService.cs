using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using System.Linq;

namespace ControleTiAPI.Services
{
    public class FunctionalityService : IFunctionalityService
    {
        private readonly DataContext _context;

        public FunctionalityService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ServerFunctionality>> GetPaginated(IQueryable<ServerFunctionality> queryable, PaginationDTO paginate)
        {
            var functionalities = await queryable
                .Include(f => f.virtualMachines)
                .Include(f => f.hosts)
                .OrderBy(f => f.description)
                .AsNoTracking().Paginate(paginate).ToListAsync();

            return functionalities;
        }

        public IQueryable<ServerFunctionality> GetFunctionalitiesFilter(FilterDTO filter)
        {
            var functionalityQueryable = _context.serverFunctionality.AsQueryable();

            foreach (var ss in filter.searches)
            {
                var search = ss.search.ToLower();

                functionalityQueryable = ss.attributte switch
                {
                    "funcname" => functionalityQueryable.Where(f => f.description.Contains(search)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            return functionalityQueryable;
        }

        public async Task<ServerFunctionality?> GetDeviceById(int id)
        {
            var func = await _context.serverFunctionality.FirstOrDefaultAsync(f => f.id == id);

            return func;
        }

        public async Task AddDevice(ServerFunctionality newFunc)
        {
            try
            {
                if (newFunc == null) throw new Exception("Nova inserção não pode ser nula.");

                var fVerify = await _context.serverFunctionality.FirstOrDefaultAsync(f => f.description == newFunc.description);

                if (fVerify != null) throw new Exception("Funcionalidade com esta descrição já existe.");

                newFunc.createdAt = DateTime.Now;
                newFunc.updatedAt = DateTime.Now;

                await _context.serverFunctionality.AddAsync(newFunc);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção da Funcionalidade > " + ex.Message);
            }
        }

        public async Task UpdateDevice(ServerFunctionality upFunc)
        {
            try
            {
                if (upFunc == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var func = await _context.serverFunctionality
                    .FirstOrDefaultAsync(f => f.id == upFunc.id);

                if (func == null) throw new Exception("Funcionalidade não encontrada.");

                var fVerify = await _context.serverFunctionality.FirstOrDefaultAsync(f => f.description == upFunc.description);

                if (fVerify != null && fVerify.id != func.id) throw new Exception("Funcionalidade com esta descrição já existe.");

                func.description = upFunc.description;
                func.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração da Funcionalidade > " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var func = await _context.serverFunctionality.FirstOrDefaultAsync(f => f.id == id);

                if (func == null) throw new Exception("Funcionalidade não encontrada.");

                _context.serverFunctionality.Remove(func);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção da Funcionalidade > " + ex.Message);
            }
        }
    }
}
