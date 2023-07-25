using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.FormGets;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using Microsoft.Extensions.Hosting;

namespace ControleTiAPI.Services
{
    public class ServerVMService : IServerVMService
    {
        private readonly DataContext _context;

        public ServerVMService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ServerVM>> GetPaginated(IQueryable<ServerVM> queryable, PaginationDTO paginate)
        {
            var virtualMchns = await queryable
                .Include(vm => vm.host)
                .Include(vm => vm.functionalities).ThenInclude(f => f.functionality)
                .OrderBy(vm => vm.code)
                .AsNoTracking().Paginate(paginate).ToListAsync();

            return virtualMchns;
        }

        public async Task<ServerVM?> GetDeviceById(int id)
        {
            var virtualMch = await _context.serverVM
                .Include(vm => vm.host)
                .Include(vm => vm.functionalities).ThenInclude(f => f.functionality)
                .AsNoTracking().FirstOrDefaultAsync(vm => vm.id == id);

            return virtualMch;
        }

        public async Task<FormGetServerVMDTO> GetFillServerVMForm()
        {
            var hosts = await _context.serverHost.Select(h => new ServerHost { id = h.id, code = h.code }).OrderBy(h => h.code).AsNoTracking().ToListAsync();
            var funcs = await _context.serverFunctionality.Select(f => new ServerFunctionality { id = f.id, description = f.description }).OrderBy(f => f.description).AsNoTracking().ToListAsync();

            return new FormGetServerVMDTO(funcs, hosts);
        }

        private async Task refreshFunctionalities(ServerVM virtualMachine)
        {
            try
            {
                if (virtualMachine.functionalities != null)
                {
                    foreach (var func in virtualMachine.functionalities)
                    {
                        var functionality = await _context.serverFunctionality.FirstOrDefaultAsync(f => f.id == func.functionalityId);

                        if (functionality == null) throw new Exception("Alguma das funcionalidades selecionadas não existe.");

                        func.functionalityId = functionality.id;
                        func.functionality = functionality;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Erro em atualizar funcionalidades da VM > " + ex.Message);
            }
        }

        public async Task AddDevice(ServerVM newVirtualMch)
        {
            try
            {
                if (newVirtualMch == null) throw new Exception("Nova inserção não pode ser nula.");

                var vmVerify = await _context.serverVM.FirstOrDefaultAsync(vm => vm.code == newVirtualMch.code);

                if (vmVerify != null) throw new Exception("VM com este código já existe.");

                await refreshFunctionalities(newVirtualMch);

                newVirtualMch.createdAt = DateTime.Now;
                await _context.serverVM.AddAsync(newVirtualMch);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção da VM > " + ex.Message);
            }
        }

        public async Task UpdateDevice(ServerVM upVirtualMch)
        {
            try
            {
                if (upVirtualMch == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var virtualMch = await _context.serverVM
                    .Include(vm => vm.functionalities).ThenInclude(f => f.functionality)
                    .FirstOrDefaultAsync(vm => vm.id == upVirtualMch.id);

                if (virtualMch == null) throw new Exception("VM não encontrada.");

                var fVerify = await _context.serverVM.FirstOrDefaultAsync(vm => vm.code == upVirtualMch.code);

                if (fVerify != null && fVerify.id != virtualMch.id) throw new Exception("VM com este código já existe.");

                await refreshFunctionalities(upVirtualMch);

                virtualMch.code = upVirtualMch.code;
                virtualMch.operationalSystem = upVirtualMch.operationalSystem;
                virtualMch.memorySize = upVirtualMch.memorySize;
                virtualMch.storageSize = upVirtualMch.storageSize;
                virtualMch.setupDate = upVirtualMch.setupDate;
                virtualMch.status = upVirtualMch.status;
                virtualMch.notes = upVirtualMch.notes;

                virtualMch.serverHostId = upVirtualMch.serverHostId;
                virtualMch.functionalities = upVirtualMch.functionalities;

                virtualMch.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração da VM > " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var virtualMch = await _context.serverVM.FirstOrDefaultAsync(vm => vm.id == id);

                if (virtualMch == null) throw new Exception("VM não encontrada.");

                _context.serverVM.Remove(virtualMch);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção da VM > " + ex.Message);
            }
        }
    }
}
