using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;

namespace ControleTiAPI.Services
{
    public class RouterService : IRouterService
    {
        private readonly DataContext _context;

        public RouterService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Router>> GetPaginated(IQueryable<Router> queryable, PaginationDTO paginate)
        {
            var routers = await queryable
                .OrderBy(r => r.code)
                .Paginate(paginate).ToListAsync();

            return routers;
        }

        public async Task<Router?> GetDeviceById(int id)
        {
            var router = await _context.router.FirstOrDefaultAsync(r => r.id == id);

            return router;
        }

        public async Task<FilterGetRouterDTO> GetFilterFillRouter()
        {
            var ssids = await _context.router.GroupBy(r => r.routerSSID).OrderBy(g => g.Key).Select(g => g.Key).ToListAsync();

            return new FilterGetRouterDTO(ssids);
        }

        public IQueryable<Router> GetFilterRouter(FilterDTO<RouterFilterDTO> filter)
        {
            var routerQueryable = _context.router.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var s = searchDto.search.ToLower();

                routerQueryable = searchDto.attributte switch
                {
                    "code" => routerQueryable.Where(r => r.code.ToLower().Contains(s)),
                    "location" => routerQueryable.Where(r => r.location.ToLower().Contains(s)),
                    "brand" => routerQueryable.Where(r => r.brand.ToLower().Contains(s)),
                    "routermac" => routerQueryable.Where(r => r.routerMAC != null && r.routerMAC.ToLower().Contains(s)),
                    "assetnumber" => routerQueryable.Where(r => r.assetNumber != null && r.assetNumber.ToLower().Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                RouterFilterDTO extra = filter.extra;

                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    routerQueryable = routerQueryable.Where(r => r.status == extra.statusFilter);
                }

                if (extra.routerSSID != "all")
                {
                    routerQueryable = routerQueryable.Where(r => r.routerSSID == extra.routerSSID);
                }

                if (extra.routerIp?.Length > 0)
                {
                    routerQueryable = routerQueryable.Where(r => r.routerIP != null && r.routerIP.Contains(extra.routerIp));
                }

                if (extra.routerUser?.Length > 0)
                {
                    routerQueryable = routerQueryable.Where(r => r.routerUser != null && r.routerUser.Contains(extra.routerUser));
                }

                if (extra.routerPassword?.Length > 0)
                {
                    routerQueryable = routerQueryable.Where(r => r.routerPassword != null && r.routerPassword.Contains(extra.routerPassword));
                }

                if (extra.fromAcquisitionDate != null)
                {
                    routerQueryable = routerQueryable.Where(p => p.acquisitionDate >= extra.fromAcquisitionDate);
                }

                if (extra.toAcquisitionDate != null && (extra.fromAcquisitionDate == null || extra.toAcquisitionDate >= extra.fromAcquisitionDate))
                {
                    routerQueryable = routerQueryable.Where(p => p.acquisitionDate <= extra.toAcquisitionDate);
                }
            }

            return routerQueryable;
        }

        public async Task AddDevice(Router newRouter)
        {
            try
            {
                if (newRouter == null) throw new Exception("Nova inserção não pode ser nula.");

                var rVerify = await _context.router.FirstOrDefaultAsync(r => r.code == newRouter.code);

                if (rVerify != null) throw new Exception("Já existe um roteador com este código");

                newRouter.createdAt = DateTime.Now;
                newRouter.updatedAt = DateTime.Now;

                await _context.router.AddAsync(newRouter);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do Roteador: " + ex.Message);
            }
        }

        public async Task UpdateDevice(Router upRouter)
        {
            try
            {
                if (upRouter == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var router = await _context.router.FirstOrDefaultAsync(r => r.id == upRouter.id);

                if (router == null) throw new Exception("Roteador não encontrado.");

                var rVerify = await _context.router.FirstOrDefaultAsync(r => r.code == upRouter.code);

                if (rVerify != null && rVerify.id != router.id) throw new Exception("Já existe um roteador com este novo código");

                router.code = upRouter.code;
                router.location = upRouter.location;
                router.brand = upRouter.brand;
                router.routerIP = upRouter.routerIP;
                router.routerSSID = upRouter.routerSSID;
                router.routerMAC = upRouter.routerMAC;
                router.routerUser = upRouter.routerUser;
                router.routerPassword = upRouter.routerPassword;
                router.status = upRouter.status;
                router.assetNumber = upRouter.assetNumber;
                router.acquisitionDate = upRouter.acquisitionDate;
                router.notes = upRouter.notes;
                router.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do Roteador: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var router = await _context.router.FirstOrDefaultAsync(r => r.id == id);

                if (router == null) throw new Exception("Roteador não encontrado.");

                _context.router.Remove(router);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Roteador: " + ex.Message);
            }
        }
    }
}
