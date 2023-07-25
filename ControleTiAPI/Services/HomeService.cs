using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.Home;
using ControleTiAPI.IServices;
using System.Runtime.InteropServices;

namespace ControleTiAPI.Services
{
    public class HomeService : IHomeService
    {
        private readonly DataContext _context;

        public HomeService(DataContext context)
        {
            _context = context;
        }

        public async Task<HomeBoxesDTO> GetHomeBoxes()
        {
            var serverBox = new HomeBox();
            serverBox.countTotal = await _context.serverHost.AsQueryable().AsNoTracking().CountAsync() + await _context.serverVM.AsNoTracking().CountAsync();
            serverBox.countPart = await _context.serverHost.AsQueryable().AsNoTracking().CountAsync(s => s.status == (int)StatusEnum.active);

            var dvrBox = new HomeBox();
            dvrBox.countTotal = await _context.dvr.AsQueryable().AsNoTracking().CountAsync(d => d.status == (int)StatusEnum.active);
            dvrBox.countPart = await _context.dvr.AsQueryable().AsNoTracking().CountAsync(d => d.status == (int)StatusEnum.active && d.activeCams >= d.qtdeChannels + 2);

            var switchBox = new HomeBox();
            switchBox.countTotal = await _context.switches.AsQueryable().AsNoTracking().CountAsync(s => s.status == (int)StatusEnum.active);
            switchBox.countPart = await _context.switches.AsQueryable().AsNoTracking().CountAsync(s => s.status == (int)StatusEnum.active && s.networkNodes.Count >= s.qtdePorts);

            var printerBox = new HomeBox();
            printerBox.countTotal = await _context.printer.AsQueryable().AsNoTracking().CountAsync(p => p.status == (int)StatusEnum.active);
            printerBox.countPart = await _context.printer.AsQueryable().AsNoTracking().CountAsync(p => p.status == (int)StatusEnum.active && p.type == (int)PrinterTypeFilterEnum.multifunction);


            return new HomeBoxesDTO(serverBox, dvrBox, switchBox, printerBox);
        }

        public async Task<TotalBoxesDTO> GetTotalBoxes()
        {
            var ramalBox = new TotalBox();
            ramalBox.total = await _context.ramal.AsQueryable().AsNoTracking().CountAsync(r => r.status == (int)StatusEnum.active);

            var chipBox = new TotalBox();
            chipBox.total = await _context.chip.AsQueryable().AsNoTracking().CountAsync(c => c.status == (int)StatusEnum.active);

            var nobreakBox = new TotalBox();
            nobreakBox.total = await _context.nobreak.AsQueryable().AsNoTracking().CountAsync(n => n.status == (int)StatusEnum.active);

            return new TotalBoxesDTO(ramalBox, chipBox, nobreakBox);
        }

        public async Task<List<PreventiveIndicatorDTO>> GetPreventivesIndicators()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var preventivesIndicator = new List<PreventiveIndicatorDTO>();
            preventivesIndicator = await _context.department
                .Where(d => d.computers.Any())
                .Select(d => new PreventiveIndicatorDTO
                {
                    departmentDescription = d.description,
                    departmentEnterprise = d.enterprise,
                    totalPreventives = d.computers.Count(c => c.status == (int)StatusEnum.active),
                    totalPreventivesDone = d.computers.Count(c => c.lastPreventiveDate >= yearAgo && c.status == (int)StatusEnum.active)
                })
                .AsNoTracking().ToListAsync();

            var otherWithoutDepartment = new PreventiveIndicatorDTO();
            var withoutDep = _context.computer.AsQueryable().Where(c => c.department == null && c.status == (int)StatusEnum.active);

            otherWithoutDepartment.departmentDescription = "Sem Departamento";
            otherWithoutDepartment.totalPreventives = await withoutDep.AsNoTracking().CountAsync();
            otherWithoutDepartment.totalPreventivesDone = await withoutDep.AsNoTracking().CountAsync(c => c.lastPreventiveDate >= yearAgo);

            preventivesIndicator.Add(otherWithoutDepartment);

            var preventiveDVR = new PreventiveIndicatorDTO();
            var dvrQuery = _context.dvr.AsQueryable().Where(d => d.status == (int)StatusEnum.active);

            preventiveDVR.departmentDescription = "DVR";
            preventiveDVR.totalPreventives = await dvrQuery.AsNoTracking().CountAsync();
            preventiveDVR.totalPreventivesDone = await dvrQuery.AsNoTracking().CountAsync(d => d.lastPreventive >= yearAgo);

            preventivesIndicator.Add(preventiveDVR);

            var preventiveNobreak = new PreventiveIndicatorDTO();
            var nobreakQuery = _context.nobreak.AsQueryable().Where(n => n.status == (int)StatusEnum.active);

            preventiveNobreak.departmentDescription = "Nobreak";
            preventiveNobreak.totalPreventives = await nobreakQuery.AsNoTracking().CountAsync();
            preventiveNobreak.totalPreventivesDone = await nobreakQuery.AsNoTracking().CountAsync(c => c.lastPreventive >= yearAgo);

            preventivesIndicator.Add(preventiveNobreak);

            var preventiveServer = new PreventiveIndicatorDTO();
            var serverQuery = _context.serverHost.AsQueryable().Where(n => n.status == (int)StatusEnum.active);

            preventiveServer.departmentDescription = "Servidor";
            preventiveServer.totalPreventives = await serverQuery.AsNoTracking().CountAsync();
            preventiveServer.totalPreventivesDone = await serverQuery.AsNoTracking().CountAsync(s => s.lastPreventiveDate >= yearAgo);

            preventivesIndicator.Add(preventiveServer);

            return preventivesIndicator;
        }

        public async Task<List<HomeReportIsGoodDTO>> GetReportIsGood()
        {
            var reportIsGood = await _context.computerReport.AsQueryable()
                .OrderBy(cr => cr.reportDate)
                .Select(cr => new HomeReportIsGoodDTO { Data = cr.reportDate.ToString("dd/MM/yyyy"), Adequado = cr.countComputerIsGood, Inadequado = cr.countComputerIsNotGood })
                .AsNoTracking().ToListAsync();

            return reportIsGood;
        }
    }
}
