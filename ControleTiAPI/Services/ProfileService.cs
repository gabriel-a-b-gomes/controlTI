using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using System.Runtime.InteropServices;

namespace ControleTiAPI.Services
{
    public class ProfileService : IProfileService
    {
        private readonly DataContext _context;

        public ProfileService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ComputerProfile>> GetPaginated(IQueryable<ComputerProfile> queryable, PaginationDTO paginate)
        {
            var profiles = await queryable
                .Include(p => p.computers)
                .OrderBy(p => p.name)
                .AsNoTracking()
                .Paginate(paginate).ToListAsync();

            return profiles;
        }

        public IQueryable<ComputerProfile> GetProfilesFilter(FilterDTO filter)
        {
            var profiles = _context.profile.AsQueryable();

            foreach (var searchDTO in filter.searches)
            {
                var s = searchDTO.search.ToLower();

                profiles = searchDTO.attributte switch
                {
                    "profileName" => profiles.Where(p => p.name.Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            return profiles;
        }

        public async Task<List<ComputerProfile>> GetProfiles()
        {
            var profiles = await _context.profile.ToListAsync();

            return profiles;
        }

        public async Task<ComputerProfile?> GetDeviceById(int id)
        {
            var profile = await _context.profile.Include(p => p.computers).FirstOrDefaultAsync(p => p.id == id);

            return profile;
        }

        public async Task AddDevice(ComputerProfile newProfile)
        {
            try
            {
                if (newProfile == null) throw new Exception("Nova inserção não pode ser nula.");

                var pVerify = await _context.profile.FirstOrDefaultAsync(p => p.name == newProfile.name);

                if (pVerify != null) throw new Exception("Perfil de uso com este nome já existe.");

                await _context.profile.AddAsync(newProfile);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do Perfil de uso: " + ex.Message);
            }
        }

        public async Task AddComputerLog(Computer computer)
        {
            ComputerLog log = new ComputerLog();


            try
            {
                var department = await _context.department.FirstOrDefaultAsync(d => d.id == computer.departmentId);
                var employee = await _context.employee.FirstOrDefaultAsync(d => d.id == computer.employeeId);

                log.computerId = computer.id;
                log.computer = computer;

                log.code = computer.code;
                log.department = department != null ? department.description : "";
                log.enterprise = department != null ? department.enterprise : "";
                log.employee = employee != null ? employee.displayName : "";
                log.computerProfile = computer.profile.name;
                log.operationalSystem = computer.operationalSystem;
                log.processingUnit = computer.processingUnit.model + " " + computer.processingUnit.generation + " " + computer.processingUnit.frequency;
                log.memorySize = computer.memorySize;
                log.storageSize = computer.storage.storageSize;

                log.storageType = computer.storage.type;

                log.status = computer.status;
                log.isGood = computer.isGood;
                log.updatedAt = DateTime.Now;

                await _context.computerLog.AddAsync(log);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao incluir o log do computador: " + ex.Message);
            }
        }

        private async Task UpdateReport()
        {
            var newComputerReport = new ComputersReport();
            newComputerReport.reportDate = DateTime.Now;

            var countIsGood = await _context.computer.AsNoTracking().CountAsync(c => c.isGood);
            var countIsNotGood = await _context.computer.AsNoTracking().CountAsync(c => !c.isGood);

            newComputerReport.countComputerIsGood = countIsGood;
            newComputerReport.countComputerIsNotGood = countIsNotGood;

            await _context.computerReport.AddAsync(newComputerReport);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDevice(ComputerProfile upProfile)
        {
            try
            {
                if (upProfile == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var profile = await _context.profile
                    .Include(p => p.computers).ThenInclude(c => c.processingUnit)
                    .Include(p => p.computers).ThenInclude(c => c.storage)
                    .FirstOrDefaultAsync(p => p.id == upProfile.id);

                if (profile == null) throw new Exception("Perfil de uso não encontrado.");

                var pVerify = await _context.profile.FirstOrDefaultAsync(p => p.name == upProfile.name);

                if (pVerify != null && pVerify.id != profile.id) throw new Exception("Perfil de uso com este nome já existe.");

                profile.name = upProfile.name;
                profile.memoryMinSize = upProfile.memoryMinSize;
                profile.storageMinSize = upProfile.storageMinSize;
                profile.storageType = upProfile.storageType;
                profile.rankOfProcessingUnit = upProfile.rankOfProcessingUnit;
                profile.rankOfOperationSystem = upProfile.rankOfOperationSystem;

                foreach (var computer in profile.computers)
                {
                    computer.profile = profile;

                    var oldIsGood = computer.isGood;
                    computer.setIsGood();

                    if (oldIsGood != computer.isGood)
                        await this.AddComputerLog(computer);
                }

                await _context.SaveChangesAsync();

                await UpdateReport();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do Perfil de uso: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var profile = await _context.profile.FirstOrDefaultAsync(p => p.id == id);

                if (profile == null) throw new Exception("Perfil de uso não encontrado.");

                _context.profile.Remove(profile);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Perfil de uso: " + ex.Message);
            }
        }
    }
}