using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.Preventives;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;
using ControleTiAPI.Models.Preventives;

namespace ControleTiAPI.Services
{
    public class NobreakService : INobreakService
    {
        private readonly DataContext _context;

        public NobreakService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Nobreak>> GetPaginated(IQueryable<Nobreak> queryable, PaginationDTO paginate)
        {
            var nobreaks = await queryable
                .OrderBy(n => n.code)
                .Paginate(paginate).ToListAsync();

            return nobreaks;
        }

        public async Task<Nobreak?> GetDeviceById(int id)
        {
            var nobreak = await _context.nobreak.FirstOrDefaultAsync(d => d.id == id);

            return nobreak;
        }

        public IQueryable<Nobreak> GetFilterNobreak(FilterDTO<NobreakFilterDTO> filter)
        {
            var nobreakQueryable = _context.nobreak.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var s = searchDto.search.ToLower();

                nobreakQueryable = searchDto.attributte switch
                {
                    "code" => nobreakQueryable.Where(n => n.code.ToLower().Contains(s)),
                    "brand" => nobreakQueryable.Where(n => n.brand.ToLower().Contains(s)),
                    "location" => nobreakQueryable.Where(n => n.location.ToLower().Contains(s)),
                    "model" => nobreakQueryable.Where(n => n.model.ToLower().Contains(s)),
                    "assetNumber" => nobreakQueryable.Where(n => n.assetNumber != null && n.assetNumber.ToLower().Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                NobreakFilterDTO extra = filter.extra;
                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    nobreakQueryable = nobreakQueryable.Where(n => n.status == extra.statusFilter);
                }

                if (extra.filterSenoidal != (int)SenoidalFilterEnum.nofilter)
                {
                    nobreakQueryable = nobreakQueryable.Where(n => extra.filterSenoidal == (int)SenoidalFilterEnum.onlySenoidal ? n.isSenoidal : !n.isSenoidal);
                }

                if (extra.typeOfUse != (int)NobreakTypeOfUseFilterEnum.nofilter)
                {
                    nobreakQueryable = nobreakQueryable.Where(n =>
                        extra.typeOfUse == (int)NobreakTypeOfUseFilterEnum.notype ?
                            n.typeOfUse == null
                            :
                            n.typeOfUse == extra.typeOfUse
                    );
                }

                if (extra.fromQtdeVA != null)
                {
                    nobreakQueryable = nobreakQueryable.Where(n => n.qtdeVA >= extra.fromQtdeVA);
                }

                if (extra.toQtdeVA != null && (extra.fromQtdeVA == null || extra.toQtdeVA >= extra.fromQtdeVA))
                {
                    nobreakQueryable = nobreakQueryable.Where(n => n.qtdeVA <= extra.toQtdeVA);
                }

                if (extra.fromAcquisitionDate != null)
                {
                    nobreakQueryable = nobreakQueryable.Where(n => n.acquisitionDate >= extra.fromAcquisitionDate);
                }

                if (extra.toAcquisitionDate != null && (extra.fromAcquisitionDate == null || extra.toAcquisitionDate >= extra.fromAcquisitionDate))
                {
                    nobreakQueryable = nobreakQueryable.Where(n => n.acquisitionDate <= extra.toAcquisitionDate);
                }

                if (extra.fromLastPreventive != null)
                {
                    nobreakQueryable = nobreakQueryable.Where(n => n.lastPreventive >= extra.fromLastPreventive);
                }

                if (extra.toLastPreventive != null && (extra.fromLastPreventive == null || extra.toLastPreventive >= extra.fromLastPreventive))
                {
                    nobreakQueryable = nobreakQueryable.Where(n => n.lastPreventive <= extra.toLastPreventive);
                }
            }

            return nobreakQueryable;
        }

        public async Task AddDevice(Nobreak newNobreak)
        {
            try
            {
                if (newNobreak == null) throw new Exception("Nova inserção não pode ser nula.");

                var verifing = await _context.nobreak.FirstOrDefaultAsync(n => n.code == newNobreak.code);

                if (verifing != null) throw new Exception("Já existe um Nobreak com este código.");

                newNobreak.createdAt = DateTime.Now;
                newNobreak.updatedAt = DateTime.Now;

                await _context.nobreak.AddAsync(newNobreak);
                await _context.SaveChangesAsync();

                // Add One Preventive
                if (newNobreak.lastPreventive != null)
                {
                    NobreakPreventive preventive = new NobreakPreventive(
                        null,
                        preventiveDate: newNobreak.lastPreventive.GetValueOrDefault(),
                        ticketId: newNobreak.ticketId,
                        nobreakId: newNobreak.id
                    );

                    await this.AddPreventive(preventive, newNobreak);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do Nobreak: " + ex.Message);
            }
        }

        public async Task UpdateDevice(Nobreak upNobreak)
        {
            try
            {
                if (upNobreak == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var nobreak = await _context.nobreak.FirstOrDefaultAsync(n => n.id == upNobreak.id);

                if (nobreak == null) throw new Exception("Nobreak não encontrado.");

                var nVerify = await _context.nobreak.FirstOrDefaultAsync(n => n.code == upNobreak.code);

                if (nVerify != null && nVerify.id != nobreak.id) throw new Exception("Já existe um Nobreak com este código.");

                nobreak.code = upNobreak.code;
                nobreak.model = upNobreak.model;
                nobreak.location = upNobreak.location;
                nobreak.brand = upNobreak.brand;
                nobreak.qtdeVA = upNobreak.qtdeVA;
                nobreak.isSenoidal = upNobreak.isSenoidal;
                nobreak.typeOfUse = upNobreak.typeOfUse;
                nobreak.status = upNobreak.status;
                nobreak.assetNumber = upNobreak.assetNumber;
                nobreak.acquisitionDate = upNobreak.acquisitionDate;
                nobreak.lastPreventive = upNobreak.lastPreventive;
                nobreak.ticketId = upNobreak.ticketId;
                nobreak.notes = upNobreak.notes;
                nobreak.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();

                var preventives = await _context.nobreakPreventive
                    .Where(p => p.nobreakId == nobreak.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();


                if (nobreak.lastPreventive != null)
                {
                    if (preventives == null || preventives.Count == 0 || preventives[0].preventiveDate != nobreak.lastPreventive)
                    {
                        NobreakPreventive preventive = new NobreakPreventive(
                            null,
                            preventiveDate: nobreak.lastPreventive.GetValueOrDefault(),
                            ticketId: nobreak.ticketId,
                            nobreakId: nobreak.id
                        );

                        await this.AddPreventive(preventive, nobreak);
                    }
                    else
                    {
                        if (preventives[0].ticketId != nobreak.ticketId)
                        {
                            NobreakPreventive preventive = new NobreakPreventive(
                                preventives[0].id,
                                preventiveDate: nobreak.lastPreventive.GetValueOrDefault(),
                                ticketId: nobreak.ticketId,
                                nobreakId: nobreak.id
                            );

                            await this.UpdatePreventive(preventive, nobreak);
                        }
                    }
                }
                else
                {
                    if (preventives != null && preventives.Count > 0)
                        await this.DeletePreventive(preventives[0].id, nobreak);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do Nobreak: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var nobreak = await _context.nobreak.FirstOrDefaultAsync(n => n.id == id);

                if (nobreak == null) throw new Exception("Nobreak não encontrado.");

                _context.nobreak.Remove(nobreak);
                await _context.SaveChangesAsync();
            } 
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do Nobreak: " + ex.Message);
            }
        }

        /*** PREVENTIVES AREA ***/


        public async Task<PreventiveDeviceReportDTO> GetPreventiveReport()
        {
            var preventivesNobreaks = await _context.nobreak
                .Where(n => n.status == (int)StatusEnum.active)
                .Select(n => new PreventiveDTO
                {
                    deviceCode = n.code,
                    deviceId = n.id,
                    lastPreventiveDate = n.lastPreventive != null ? n.lastPreventive : null,
                    dueDate = PreventiveDTO.setDueDate(n.lastPreventive, n.createdAt.GetValueOrDefault()),
                    ticketId = n.ticketId != null ? n.ticketId : "",
                    statusPreventive = PreventiveDTO.setStatusPreventive(n.lastPreventive, n.createdAt.GetValueOrDefault())
                })
                .OrderBy(p => p.deviceCode)
                .AsNoTracking()
                .ToListAsync();

            int total = preventivesNobreaks.Count();
            int doneQtde = preventivesNobreaks.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.done);
            int overdueQtde = preventivesNobreaks.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.overdue);
            int todoQtde = preventivesNobreaks.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.todo);

            return new PreventiveDeviceReportDTO(preventivesNobreaks, total, doneQtde, overdueQtde, todoQtde, null);
        }

        public IQueryable<Nobreak> GetPreventivesTodo()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var prevTodoNobreak = _context.nobreak.Where(d => d.status == (int)StatusEnum.active && (d.lastPreventive == null || d.lastPreventive < yearAgo));

            return prevTodoNobreak;
        }

        public IQueryable<Nobreak> GetPreventivesDone()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var prevDoneNobreak = _context.nobreak.Where(d => d.status == (int)StatusEnum.active && d.lastPreventive >= yearAgo);

            return prevDoneNobreak;
        }

        public IQueryable<Nobreak> GetPreventivesFiltered(IQueryable<Nobreak> queryable, ICollection<string> searches)
        {
            var filterQuery = queryable;

            foreach (var search in searches)
            {
                filterQuery = filterQuery.Where(d => d.code.Contains(search.ToLower()));
            }

            return filterQuery;
        }

        public async Task<List<Nobreak>> GetPaginatedPreventives(IQueryable<Nobreak> queryable, PaginationDTO paginate)
        {
            var preventivesNobreak = await queryable
                                .Include(d => d.preventives)
                                .Select(d => new Nobreak
                                {
                                    id = d.id,
                                    code = d.code,
                                    lastPreventive = d.lastPreventive,
                                    ticketId = d.ticketId,
                                    createdAt = d.createdAt,
                                    preventives = d.preventives.OrderByDescending(p => p.preventiveDate).ToList()
                                })
                                .AsNoTracking()
                                .Paginate(paginate).ToListAsync();

            return preventivesNobreak;
        }

        public async Task AddPreventive(NobreakPreventive newPreventive)
        {
            try
            {
                var nobreak = await _context.nobreak.FirstOrDefaultAsync(d => d.id == newPreventive.nobreakId);
                if (nobreak == null) throw new Exception("Nobreak não existe");

                if (nobreak.lastPreventive == null || nobreak.lastPreventive < newPreventive.preventiveDate)
                {
                    nobreak.lastPreventive = newPreventive.preventiveDate;
                    nobreak.ticketId = newPreventive.ticketId;
                }
                
                await _context.nobreakPreventive.AddAsync(newPreventive);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao adicionar a Preventiva ao Nobreak: " + ex.Message);
            }
        }

        // ADD Preventive Isomorfo
        public async Task AddPreventive(NobreakPreventive newPreventive, Nobreak nobreak)
        {
            try
            {
                if (nobreak.lastPreventive == null || nobreak.lastPreventive < newPreventive.preventiveDate)
                {
                    nobreak.lastPreventive = newPreventive.preventiveDate;
                    nobreak.ticketId = newPreventive.ticketId;
                }

                await _context.nobreakPreventive.AddAsync(newPreventive);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao adicionar a Preventiva ao Nobreak: " + ex.Message);
            }
        }

        public async Task UpdatePreventive(NobreakPreventive upPreventive)
        {
            try
            {
                var nobreak = await _context.nobreak.FirstOrDefaultAsync(d => d.id == upPreventive.nobreakId);
                if (nobreak == null) throw new Exception("Nobreak não existe");

                var preventive = await _context.nobreakPreventive.FirstOrDefaultAsync(p => p.id == upPreventive.id);
                if (preventive == null) throw new Exception("Preventiva não existe");

                preventive.preventiveDate = upPreventive.preventiveDate;
                preventive.ticketId = upPreventive.ticketId;

                await _context.SaveChangesAsync();

                var preventives = await _context.nobreakPreventive
                   .Where(p => p.nobreakId == nobreak.id)
                   .OrderByDescending(p => p.preventiveDate)
                   .Take(1)
                   .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    nobreak.lastPreventive = preventives[0].preventiveDate;
                    nobreak.ticketId = preventives[0].ticketId;
                }
                else
                {
                    nobreak.lastPreventive = null;
                    nobreak.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar a Preventiva ao Nobreak: " + ex.Message);
            }
        }

        // Update Computer Isomorfo
        public async Task UpdatePreventive(NobreakPreventive upPreventive, Nobreak nobreak)
        {
            try
            {
                var preventive = await _context.nobreakPreventive.FirstOrDefaultAsync(p => p.id == upPreventive.id);
                if (preventive == null) throw new Exception("Preventiva não existe");

                preventive.preventiveDate = upPreventive.preventiveDate;
                preventive.ticketId = upPreventive.ticketId;

                await _context.SaveChangesAsync();

                var preventives = await _context.nobreakPreventive
                   .Where(p => p.nobreakId == nobreak.id)
                   .OrderByDescending(p => p.preventiveDate)
                   .Take(1)
                   .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    nobreak.lastPreventive = preventives[0].preventiveDate;
                    nobreak.ticketId = preventives[0].ticketId;
                }
                else
                {
                    nobreak.lastPreventive = null;
                    nobreak.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar a Preventiva ao Nobreak: " + ex.Message);
            }
        }

        public async Task DeletePreventive(int preventiveId, int nobreakId)
        {
            try
            {
                var nobreak = await _context.nobreak.FirstOrDefaultAsync(n => n.id == nobreakId);
                if (nobreak == null) throw new Exception("Nobreak não existe");

                var preventive = await _context.nobreakPreventive.FirstOrDefaultAsync(p => p.id == preventiveId);
                if (preventive == null) throw new Exception("Preventiva não existe");

                _context.nobreakPreventive.Remove(preventive);

                await _context.SaveChangesAsync();

                var preventives = await _context.nobreakPreventive
                    .Where(p => p.nobreakId == nobreak.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    nobreak.lastPreventive = preventives[0].preventiveDate;
                    nobreak.ticketId = preventives[0].ticketId;
                }
                else
                {
                    nobreak.lastPreventive = null;
                    nobreak.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover a Preventiva do Nobreak: " + ex.Message);
            }
        }

        // Delete Preventive Isomorfo
        public async Task DeletePreventive(int preventiveId, Nobreak nobreak)
        {
            try
            {
                var preventive = await _context.nobreakPreventive.FirstOrDefaultAsync(p => p.id == preventiveId);
                if (preventive == null) throw new Exception("Preventiva não existe");

                _context.nobreakPreventive.Remove(preventive);

                await _context.SaveChangesAsync();

                var preventives = await _context.nobreakPreventive
                    .Where(p => p.nobreakId == nobreak.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    nobreak.lastPreventive = preventives[0].preventiveDate;
                    nobreak.ticketId = preventives[0].ticketId;
                }
                else
                {
                    nobreak.lastPreventive = null;
                    nobreak.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover a Preventiva do Nobreak: " + ex.Message);
            }
        }
    }
}
