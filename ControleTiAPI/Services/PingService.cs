using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;
using Microsoft.AspNetCore.Components.Routing;
using System.Diagnostics;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Reflection;

namespace ControleTiAPI.Services
{
    public class PingService : IPingService
    {
        private readonly DataContext _context;
        private readonly int _timeout = 500; // Time to ping a device, if it does not responde in this interval, then it's off

        public PingService(DataContext context)
        {
            _context = context;
        }

        private static List<PingDTO> OrderPingsBy(IEnumerable<PingDTO> pings, int orderby, int asc)
        {
            if (orderby == (int)OrderByTypePingEnum.code)
            {
                if (asc == 1)
                {
                    return pings.OrderBy(p => p.code).ToList();
                }

                return pings.OrderByDescending(p => p.code).ToList();
            }

            if (orderby == (int)OrderByTypePingEnum.address)
            {
                if (asc == 1)
                {
                    return pings.OrderBy(p => p.address).ToList();
                }

                return pings.OrderByDescending(p => p.address).ToList();
            }

            if (orderby == (int)OrderByTypePingEnum.deviceType)
            {
                if (asc == 1)
                {
                    return pings.OrderBy(p => p.deviceCategory).ToList();
                }

                return pings.OrderByDescending(p => p.deviceCategory).ToList();
            }

            if (asc == 1)
            {
                return pings.OrderBy(p => p.status).ToList();
            }

            return pings.OrderByDescending(p => p.status).ToList();
        }

        public async Task<List<PingDTO>> GetPingComputersList(string? search, int orderby, int asc)
        {
            var pings = new List<PingDTO>();

            var cmpQuery = _context.computer.AsQueryable();

            if (search != null && search.Length > 0)
            {
                cmpQuery = cmpQuery.Where(c =>
                    c.code.Contains(search.ToLower()) ||
                    (c.employee != null && (c.employee.displayName.Contains(search.ToLower()) || c.employee.name.Contains(search.ToLower()))) ||
                    (c.department != null && (c.department.description.Contains(search.ToLower()) || c.department.enterprise.Contains(search.ToLower())))
                );
            }
            
            var computers = await cmpQuery
                .Include(c => c.employee)
                .Include(c => c.department)
                .AsNoTracking()
                .ToListAsync();

            Parallel.ForEach(computers, computer =>
            {
                Ping ping = new Ping();

                try
                {
                    var rpy = ping.Send(computer.code, _timeout);

                    pings.Add(new PingDTO
                    {
                        deviceId = computer.id,
                        code = computer.code,
                        deviceCategory = (int)DeviceCategoryEnum.computer,
                        address = rpy.Address.ToString(),
                        roundTripTime = rpy.RoundtripTime,
                        status = (int)rpy.Status,
                        employee = computer.employee != null ? computer.employee.displayName : "",
                        department = computer.department != null ? computer.department.description : "",
                        enterprise = computer.department != null ? computer.department.enterprise : ""
                    });
                }
                catch (Exception)
                {
                    pings.Add(new PingDTO
                    {
                        deviceId = computer.id,
                        code = computer.code,
                        deviceCategory = (int)DeviceCategoryEnum.computer,
                        address = "0.0.0.0",
                        roundTripTime = _timeout,
                        status = (int)IPStatus.BadRoute,
                        employee = computer.employee != null ? computer.employee.displayName : "",
                        department = computer.department != null ? computer.department.description : "",
                        enterprise = computer.department != null ? computer.department.enterprise : ""
                    });
                }
            });

            return OrderPingsBy(pings, orderby, asc);
        }

        public async Task<List<PingDTO>> GetPingRamalsList(string? search, int orderby, int asc)
        {
            var pings = new List<PingDTO>();

            var rmlQuery = _context.ramal.AsQueryable();

            if (search != null && search.Length > 0)
            {
                rmlQuery = rmlQuery.Where(r =>
                    r.number.Contains(search.ToLower()) ||
                    (r.employee != null && (r.employee.displayName.Contains(search.ToLower()) || r.employee.name.Contains(search.ToLower()))) ||
                    (r.department != null && (r.department.description.Contains(search.ToLower()) || r.department.enterprise.Contains(search.ToLower())))
                );
            }

            var ramals = await rmlQuery
                .Include(c => c.employee)
                .Include(c => c.department)
                .AsNoTracking()
                .ToListAsync();

            Parallel.ForEach(ramals, ramal =>
            {
                Ping ping = new Ping();

                try
                {
                    var rpy = ping.Send(ramal.deviceIP, _timeout);

                    pings.Add(new PingDTO
                    {
                        deviceId = ramal.id,
                        code = ramal.number,
                        deviceCategory = (int)DeviceCategoryEnum.ramal,
                        address = rpy.Address.ToString(),
                        roundTripTime = rpy.RoundtripTime,
                        status = (int)rpy.Status,
                        employee = ramal.employee != null ? ramal.employee.displayName : "",
                        department = ramal.department != null ? ramal.department.description : "",
                        enterprise = ramal.department != null ? ramal.department.enterprise : ""
                    });
                }
                catch (Exception)
                {
                    pings.Add(new PingDTO
                    {
                        deviceId = ramal.id,
                        code = ramal.number,
                        deviceCategory = (int)DeviceCategoryEnum.ramal,
                        address = "0.0.0.0",
                        roundTripTime = _timeout,
                        status = (int)IPStatus.BadRoute,
                        employee = ramal.employee != null ? ramal.employee.displayName : "",
                        department = ramal.department != null ? ramal.department.description : "",
                        enterprise = ramal.department != null ? ramal.department.enterprise : ""
                    });
                }
            });

            return OrderPingsBy(pings, orderby, asc);
        }

        public async Task<List<PingDTO>> GetPingServerList(string? search, int orderby, int asc)
        {
            var pings = new List<PingDTO>();

            var srvHQ = _context.serverHost.AsQueryable();

            if (search != null && search.Length > 0)
            {
                srvHQ = srvHQ.Where(s =>
                    s.code.Contains(search.ToLower())
                );
            }

            var servers = await srvHQ
                .AsNoTracking()
                .ToListAsync();

            Parallel.ForEach(servers, server =>
            {
                Ping ping = new Ping();

                try
                {
                    var rpy = ping.Send(server.code);

                    pings.Add(new PingDTO
                    {
                        deviceId = server.id,
                        code = server.code,
                        deviceCategory = (int)DeviceCategoryEnum.host,
                        address = rpy.Address.ToString(),
                        roundTripTime = rpy.RoundtripTime,
                        status = (int)rpy.Status
                    });
                }
                catch (Exception)
                {
                    pings.Add(new PingDTO
                    {
                        deviceId = server.id,
                        code = server.code,
                        deviceCategory = (int)DeviceCategoryEnum.host,
                        address = "0.0.0.0",
                        roundTripTime = _timeout,
                        status = (int)IPStatus.BadRoute
                    });
                }
            });

            var srvVQ = _context.serverVM.AsQueryable();

            if (search != null && search.Length > 0)
            {
                srvVQ = srvVQ.Where(s =>
                    s.code.Contains(search.ToLower())
                );
            }

            var vms = await srvVQ
                .AsNoTracking()
                .ToListAsync();

            Parallel.ForEach(vms, vm =>
            {
                Ping ping = new Ping();

                try
                {
                    var rpy = ping.Send(vm.code);

                    pings.Add(new PingDTO
                    {
                        deviceId = vm.id,
                        code = vm.code,
                        deviceCategory = (int)DeviceCategoryEnum.vm,
                        address = rpy.Address.ToString(),
                        roundTripTime = rpy.RoundtripTime,
                        status = (int)rpy.Status
                    });
                }
                catch (Exception)
                {
                    pings.Add(new PingDTO
                    {
                        deviceId = vm.id,
                        code = vm.code,
                        deviceCategory = (int)DeviceCategoryEnum.vm,
                        address = "0.0.0.0",
                        roundTripTime = _timeout,
                        status = (int)IPStatus.BadRoute
                    });
                }
            });

            return OrderPingsBy(pings, orderby, asc);
        }


        public async Task<List<PingDTO>> GetPingGeneralList(string? search, int orderby, int asc)
        {
            var pings = new List<PingDTO>();

            var rtrQr = _context.router.AsQueryable();

            if (search != null && search.Length > 0)
            {
                rtrQr = rtrQr.Where(r =>
                    r.code.Contains(search.ToLower())
                );
            }

            var routers = await rtrQr.ToListAsync();

            Parallel.ForEach(routers, router =>
            {
                Ping ping = new Ping();

                try
                {
                    var rpy = ping.Send(router.routerIP, _timeout);

                    pings.Add(new PingDTO
                    {
                        deviceId = router.id,
                        code = router.code,
                        deviceCategory = (int)DeviceCategoryEnum.router,
                        address = rpy.Address.ToString(),
                        roundTripTime = rpy.RoundtripTime,
                        status = (int)rpy.Status
                    });
                }
                catch (Exception)
                {
                    pings.Add(new PingDTO
                    {
                        deviceId = router.id,
                        code = router.code,
                        deviceCategory = (int)DeviceCategoryEnum.router,
                        address = "0.0.0.0",
                        roundTripTime = _timeout,
                        status = (int)IPStatus.BadRoute
                    });
                }
            });

            var swtQr = _context.switches.AsQueryable();

            if (search != null && search.Length > 0)
            {
                swtQr = swtQr.Where(s =>
                    s.code.Contains(search.ToLower())
                );
            }

            var switches = await swtQr.ToListAsync();

            Parallel.ForEach(switches, pSwitch =>
            {
                Ping ping = new Ping();

                try
                {
                    var rpy = ping.Send(pSwitch.switchIP, _timeout);

                    pings.Add(new PingDTO
                    {
                        deviceId = pSwitch.id,
                        code = pSwitch.code,
                        deviceCategory = (int)DeviceCategoryEnum.switches,
                        address = rpy.Address.ToString(),
                        roundTripTime = rpy.RoundtripTime,
                        status = (int)rpy.Status
                    });
                }
                catch (Exception)
                {
                    pings.Add(new PingDTO
                    {
                        deviceId = pSwitch.id,
                        code = pSwitch.code,
                        deviceCategory = (int)DeviceCategoryEnum.switches,
                        address = "0.0.0.0",
                        roundTripTime = _timeout,
                        status = (int)IPStatus.BadRoute
                    });
                }
            });

            var ptrQr = _context.printer.AsQueryable();

            if (search != null && search.Length > 0)
            {
                ptrQr = ptrQr.Where(p =>
                    p.code.Contains(search.ToLower())
                );
            }

            var printers = await ptrQr.Where(p => p.printerIP != null && p.printerIP.Length > 0).ToListAsync();

            Parallel.ForEach(printers, printer =>
            {
                Ping ping = new Ping();

                try
                {
                    var rpy = ping.Send(printer.printerIP!, _timeout);

                    pings.Add(new PingDTO
                    {
                        deviceId = printer.id,
                        code = printer.code,
                        deviceCategory = (int)DeviceCategoryEnum.printer,
                        address = rpy.Address.ToString(),
                        roundTripTime = rpy.RoundtripTime,
                        status = (int)rpy.Status
                    });
                }
                catch (Exception)
                {
                    pings.Add(new PingDTO
                    {
                        deviceId = printer.id,
                        code = printer.code,
                        deviceCategory = (int)DeviceCategoryEnum.printer,
                        address = "0.0.0.0",
                        roundTripTime = _timeout,
                        status = (int)IPStatus.BadRoute
                    });
                }
            });

            var dvrQr = _context.dvr.AsQueryable();

            if (search != null && search.Length > 0)
            {
                dvrQr = dvrQr.Where(d =>
                    d.code.Contains(search.ToLower())
                );
            }

            var dvrs = await dvrQr.ToListAsync();

            Parallel.ForEach(dvrs, dvr =>
            {
                Ping ping = new Ping();

                try
                {
                    var rpy = ping.Send(dvr.dvrIP, _timeout);

                    pings.Add(new PingDTO
                    {
                        deviceId = dvr.id,
                        code = dvr.code,
                        deviceCategory = (int)DeviceCategoryEnum.dvr,
                        address = rpy.Address.ToString(),
                        roundTripTime = rpy.RoundtripTime,
                        status = (int)rpy.Status
                    });
                }
                catch (Exception)
                {
                    pings.Add(new PingDTO
                    {
                        deviceId = dvr.id,
                        code = dvr.code,
                        deviceCategory = (int)DeviceCategoryEnum.dvr,
                        address = "0.0.0.0",
                        roundTripTime = _timeout,
                        status = (int)IPStatus.BadRoute
                    });
                }
            });

            return OrderPingsBy(pings, orderby, asc);
        }
    }
}
