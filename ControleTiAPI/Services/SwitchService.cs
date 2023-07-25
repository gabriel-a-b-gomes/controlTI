using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;

namespace ControleTiAPI.Services
{
    public class SwitchService : ISwitchService
    {
        private readonly DataContext _context;

        public SwitchService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Switches>> GetPaginated(IQueryable<Switches> queryable, PaginationDTO paginate)
        {
            var switches = await queryable
                .Include(s => s.networkNodes)
                .OrderBy(s => s.code)
                .AsNoTracking()
                .Paginate(paginate).ToListAsync();

            return switches;
        }

        public async Task<Switches?> GetDeviceById(int id)
        {
            var sSwitch = await _context.switches.FirstOrDefaultAsync(s => s.id == id);

            return sSwitch;
        }

        public IQueryable<Switches> GetSwitchFilter(FilterDTO<SwitchFilterDTO> filter)
        {
            var switchQueryable = _context.switches.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var sr = searchDto.search.ToLower();

                switchQueryable = searchDto.attributte switch
                {
                    "code" => switchQueryable.Where(s => s.code.ToLower().Contains(sr)),
                    "location" => switchQueryable.Where(s => s.location.ToLower().Contains(sr)),
                    "brand" => switchQueryable.Where(s => s.brand.ToLower().Contains(sr)),
                    "switchmac" => switchQueryable.Where(s => s.switchMAC != null && s.switchMAC.ToLower().Contains(sr)),
                    "assetnumber" => switchQueryable.Where(s => s.assetNumber != null && s.assetNumber.ToLower().Contains(sr)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                SwitchFilterDTO extra = filter.extra;

                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    switchQueryable = switchQueryable.Where(s => s.status == extra.statusFilter);
                }

                if (extra.switchIp?.Length > 0)
                {
                    switchQueryable = switchQueryable.Where(s => s.switchIP != null && s.switchIP.Contains(extra.switchIp));
                }

                if (extra.switchUser?.Length > 0)
                {
                    switchQueryable = switchQueryable.Where(s => s.switchUser != null && s.switchUser.Contains(extra.switchUser));
                }

                if (extra.switchPassword?.Length > 0)
                {
                    switchQueryable = switchQueryable.Where(s => s.switchPassword != null && s.switchPassword.Contains(extra.switchPassword));
                }

                if (extra.fromQtdePorts != null)
                {
                    switchQueryable = switchQueryable.Where(s => s.qtdePorts >= extra.fromQtdePorts);
                }

                if (extra.toQtdePorts != null && (extra.fromQtdePorts == null || extra.toQtdePorts >= extra.fromQtdePorts))
                {
                    switchQueryable = switchQueryable.Where(s => s.qtdePorts <= extra.toQtdePorts);
                }

                if (extra.fromUsedPorts != null)
                {
                    switchQueryable = switchQueryable.Where(s => s.networkNodes.Count >= extra.fromUsedPorts);
                }

                if (extra.toUsedPorts != null && (extra.fromUsedPorts == null || extra.toUsedPorts >= extra.fromUsedPorts))
                {
                    switchQueryable = switchQueryable.Where(s => s.networkNodes.Count <= extra.toUsedPorts);
                }

                if (extra.fromAcquisitionDate != null)
                {
                    switchQueryable = switchQueryable.Where(s => s.acquisitionDate >= extra.fromAcquisitionDate);
                }

                if (extra.toAcquisitionDate != null && (extra.fromAcquisitionDate == null || extra.toAcquisitionDate >= extra.fromAcquisitionDate))
                {
                    switchQueryable = switchQueryable.Where(s => s.acquisitionDate <= extra.toAcquisitionDate);
                }
            }

            return switchQueryable;
        }

        public async Task AddDevice(Switches newSwitch)
        {
            try
            {
                if (newSwitch == null) throw new Exception("Nova inserção não pode ser nula.");

                var sVerify = await _context.switches.FirstOrDefaultAsync(s => s.code == newSwitch.code);

                if (sVerify != null) throw new Exception("Já existe um switch com este código.");

                newSwitch.createdAt = DateTime.Now;
                newSwitch.updatedAt = DateTime.Now;

                await _context.switches.AddAsync(newSwitch);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do Switch: " + ex.Message);
            }
        }

        public async Task UpdateDevice(Switches upSwitch)
        {
            try
            {
                if (upSwitch == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var sSwitch = await _context.switches.FirstOrDefaultAsync(s => s.id == upSwitch.id);

                if (sSwitch == null) throw new Exception("Switch não encontrado.");

                var sVerify = await _context.switches.FirstOrDefaultAsync(s => s.code == upSwitch.code);

                if (sVerify != null && sVerify.id != sSwitch.id) throw new Exception("Já existe um switch com este novo código.");

                sSwitch.code = upSwitch.code;
                sSwitch.location = upSwitch.location;
                sSwitch.brand = upSwitch.brand;
                sSwitch.switchIP = upSwitch.switchIP;
                sSwitch.qtdePorts = upSwitch.qtdePorts;
                sSwitch.switchMAC = upSwitch.switchMAC;
                sSwitch.switchUser = upSwitch.switchUser;
                sSwitch.switchPassword = upSwitch.switchPassword;
                sSwitch.status = upSwitch.status;
                sSwitch.assetNumber = upSwitch.assetNumber;
                sSwitch.acquisitionDate = upSwitch.acquisitionDate;
                sSwitch.notes = upSwitch.notes;
                sSwitch.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do Switch: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var sSwitch = await _context.switches.FirstOrDefaultAsync(s => s.id == id);

                if (sSwitch == null) throw new Exception("Switch não encontrado.");

                _context.switches.Remove(sSwitch);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Switch: " + ex.Message);
            }
        }
    }
}
