using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace ControleTiAPI.Services
{
    public class NetworkNodeService : INetworkNodeService
    {
        private readonly DataContext _context;

        public NetworkNodeService(DataContext context, ISwitchService switchService)
        {
            _context = context;
        }

        public async Task<List<NetworkNode>> GetPaginated(IQueryable<NetworkNode> queryable, PaginationDTO paginate)
        {
            var networkNodes = await queryable
                .Include(n => n.switchOfNode)
                .Include(n => n.employeeNetworkNode).ThenInclude(e => e.department)
                .OrderBy(n => n.code)
                .AsNoTracking()
                .Paginate(paginate).ToListAsync();

            return networkNodes;
        }

        public async Task<NetworkNode?> GetDeviceById(int id)
        {
            var networkNode = await _context.networkNode.FirstOrDefaultAsync(n => n.id == id);

            return networkNode;
        }

        public async Task<FilterGetNodeDTO> GetFilterFillNode()
        {
            var switches = await _context.switches.OrderBy(s => s.code).Select(s => new SwitchGet { id = s.id, code = s.code }).AsNoTracking().ToListAsync();
            var patchpanels = await _context.networkNode.GroupBy(n => n.patchPanelLocation).OrderBy(g => g.Key).Select(g => g.Key).ToListAsync();

            return new FilterGetNodeDTO(switches, patchpanels);
        }

        public IQueryable<NetworkNode> GetNodeFilter(FilterDTO<NetworkNodeFilterDTO> filter)
        {
            var nodeQueryable = _context.networkNode.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var sr = searchDto.search.ToLower();

                nodeQueryable = searchDto.attributte switch
                {
                    "code" => nodeQueryable.Where(n => n.code.Contains(sr)),
                    "location" => nodeQueryable.Where(n => n.location.Contains(sr)),
                    "employeename" => nodeQueryable.Where(n => n.employeeNetworkNode != null && n.employeeNetworkNode.displayName.Contains(sr)),
                    "employeedepartment" => nodeQueryable.Where(n => n.employeeNetworkNode != null && n.employeeNetworkNode.department != null && n.employeeNetworkNode.department.description.Contains(sr)),
                    "employeeenterprise" => nodeQueryable.Where(n => n.employeeNetworkNode != null && n.employeeNetworkNode.department != null && n.employeeNetworkNode.department.enterprise.Contains(sr)),
                    "patchnodeid" => nodeQueryable.Where(n => n.patchPanelNodeId != null && n.patchPanelNodeId.Contains(sr)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                NetworkNodeFilterDTO extra = filter.extra;

                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    nodeQueryable = nodeQueryable.Where(n => n.switchOfNode.status == extra.statusFilter);
                }

                if (extra.switchId >= 0)
                {
                    nodeQueryable = nodeQueryable.Where(n => n.switchId == extra.switchId);
                }

                if (extra.patchPanel != "all")
                {
                    nodeQueryable = nodeQueryable.Where(n => n.patchPanelLocation == null || n.patchPanelLocation == extra.patchPanel);
                }

                if (extra.fromPorts != null)
                {
                    nodeQueryable = nodeQueryable.Where(n => n.switchPort >= extra.fromPorts);
                }

                if (extra.toPorts != null && (extra.fromPorts == null || extra.toPorts >= extra.fromPorts))
                {
                    nodeQueryable = nodeQueryable.Where(n => n.switchPort <= extra.toPorts);
                }

                if (extra.fromPatchPort != null)
                {
                    nodeQueryable = nodeQueryable.Where(n => n.patchPanelLocation == null || n.patchPanelPort >= extra.fromPatchPort);
                }

                if (extra.toPatchPort != null && (extra.fromPatchPort == null || extra.toPatchPort >= extra.fromPatchPort))
                {
                    nodeQueryable = nodeQueryable.Where(n => n.patchPanelLocation == null || n.patchPanelPort <= extra.toPatchPort);
                }
            }

            return nodeQueryable;
        }

        public async Task<FormGetNodeDTO> GetFillNodeForm()
        {
            var employees = await _context.employee.OrderBy(e => e.name).AsNoTracking().ToListAsync();
            var switches = await _context.switches.OrderBy(s => s.code).AsNoTracking().ToListAsync();

            return new FormGetNodeDTO(employees, switches);
        }
        public async Task AddDevice(NetworkNode newNetworkNode)
        {
            try
            {
                if (newNetworkNode == null) throw new Exception("Nova inserção não pode ser nula.");

                var nVerify = await _context.networkNode.FirstOrDefaultAsync(n => n.code == newNetworkNode.code);

                if (nVerify != null) throw new Exception("Já existe Ponto de rede com essa identificação.");

                var nodeSwitch = await _context.switches.Include(s => s.networkNodes).FirstOrDefaultAsync(s => s.id == newNetworkNode.switchId);

                if (nodeSwitch == null) throw new Exception("O switch do ponto de rede não existe.");

                var nodeCount = nodeSwitch.networkNodes.Count;

                if (nodeCount + 1 > nodeSwitch.qtdePorts) throw new Exception("Switch já está cheio, verifique para excluir algum ponto de rede que já está cadastrado mas não está em uso.");

                var checkPort = await _context.networkNode.FirstOrDefaultAsync(n => n.switchId == newNetworkNode.switchId && n.switchPort == newNetworkNode.switchPort);

                if (checkPort != null) throw new Exception("Esta porta do switch " + nodeSwitch.code + " já está em uso.");

                newNetworkNode.createdAt = DateTime.Now;
                newNetworkNode.updatedAt = DateTime.Now;

                await _context.networkNode.AddAsync(newNetworkNode);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do Ponto de rede: " + ex.Message);
            }
        }

        public async Task UpdateDevice(NetworkNode upNetworkNode)
        {
            try
            {
                if (upNetworkNode == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var networkNode = await _context.networkNode.FirstOrDefaultAsync(n => n.id == upNetworkNode.id);

                if (networkNode == null) throw new Exception("Ponto de rede não encontrado.");

                var nVerify = await _context.networkNode.FirstOrDefaultAsync(n => n.code == upNetworkNode.code);

                if (nVerify != null && nVerify.id != networkNode.id) throw new Exception("Já existe Ponto de rede com essa identificação.");

                var nodeSwitch = await _context.switches.Include(s => s.networkNodes).FirstOrDefaultAsync(s => s.id == upNetworkNode.switchId);

                if (nodeSwitch == null) throw new Exception("O switch do ponto de rede não existe.");

                if (networkNode.switchId != upNetworkNode.switchId)
                {
                    var nodeCount = nodeSwitch.networkNodes.Count;

                    if (nodeCount + 1 > nodeSwitch.qtdePorts) throw new Exception("Switch já está cheio, verifique para excluir algum ponto de rede que já está cadastrado mas não está em uso.");
                }

                var checkPort = await _context.networkNode.FirstOrDefaultAsync(n => n.switchId == upNetworkNode.switchId && n.switchPort == upNetworkNode.switchPort);

                if (checkPort != null && checkPort.id != networkNode.id) throw new Exception("Esta porta do switch " + nodeSwitch.code + " já está em uso.");

                networkNode.code = upNetworkNode.code;
                networkNode.location = upNetworkNode.location;
                networkNode.switchPort = upNetworkNode.switchPort;
                networkNode.patchPanelLocation = upNetworkNode.patchPanelLocation;
                networkNode.patchPanelPort = upNetworkNode.patchPanelPort;
                networkNode.patchPanelNodeId = upNetworkNode.patchPanelNodeId;
                networkNode.notes = upNetworkNode.notes;
                networkNode.switchId = upNetworkNode.switchId;
                networkNode.employeeId = upNetworkNode.employeeId;
                networkNode.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do Ponto de rede: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var networkNode = await _context.networkNode.FirstOrDefaultAsync(n => n.id == id);

                if (networkNode == null) throw new Exception("Ponto de rede não encontrado.");

                _context.networkNode.Remove(networkNode);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Ponto de rede: " + ex.Message);
            }
        }
    }
}
