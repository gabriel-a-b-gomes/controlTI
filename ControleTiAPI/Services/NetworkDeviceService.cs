using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.IServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace ControleTiAPI.Services
{
    public class NetworkDeviceService : INetworkDeviceService
    {
        private readonly DataContext _context;

        public NetworkDeviceService(DataContext context)
        {
            _context = context;
        }

        public async Task<InfoNetDevicesDTO> GetInfoNetDevices()
        {
            int countSwitchFull = 0;
            int countFreePortsSwitches = 0;

            var countRouters = await _context.router.AsQueryable().AsNoTracking().CountAsync(r => r.status == 1);
            var countSwitches = await _context.switches.AsQueryable().AsNoTracking().CountAsync(s => s.status == 1);
            var switchesNetNode = await _context.switches.AsQueryable().Include(s => s.networkNodes).AsNoTracking().ToListAsync();

            foreach (var switchnet in switchesNetNode)
            {
                if (switchnet.status == 1)
                {
                    var countSwitchNodes = switchnet.networkNodes.Count;
                    if (countSwitchNodes >= switchnet.qtdePorts)
                        countSwitchFull++;
                    else
                        countFreePortsSwitches += switchnet.qtdePorts - countSwitchNodes ;
                }
            }

            var countSwitchesPorts = await _context.switches.AsQueryable().AsNoTracking().SumAsync(s => s.status == 1 ? s.qtdePorts : 0);
            var countNetNodes = await _context.networkNode.AsQueryable().AsNoTracking().CountAsync();

            return new InfoNetDevicesDTO(countRouters, countSwitches, countSwitchFull, countFreePortsSwitches, countNetNodes, countSwitchesPorts);
        }
    }
}
