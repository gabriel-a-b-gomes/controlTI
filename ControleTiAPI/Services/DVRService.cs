using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.FilterGets;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.DTOs.Infos;
using ControleTiAPI.DTOs.Preventives;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;
using ControleTiAPI.Models;
using ControleTiAPI.Models.Preventives;
using Microsoft.Identity.Client;
using System.Diagnostics;

namespace ControleTiAPI.Services
{
    public class DVRService : IDVRService
    {
        private readonly DataContext _context;

        public DVRService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<DVR>> GetPaginated(IQueryable<DVR> queryable, PaginationDTO paginate)
        {
            var dvrs = await queryable
                .OrderBy(d => d.code)
                .Paginate(paginate).ToListAsync();

            return dvrs;
        }

        public async Task<DVR?> GetDeviceById(int id)
        {
            var dvr = await _context.dvr.FirstOrDefaultAsync(d => d.id == id);

            return dvr;
        }

        public async Task<InfoDVRDTO> GetInfoDVR()
        {
            var countDVR = await _context.dvr.AsQueryable().AsNoTracking().CountAsync(d => d.status == 1);
            var coutnDVRFull = await _context.dvr.AsQueryable().AsNoTracking().CountAsync(d => d.activeCams >= d.qtdeChannels && d.status == 1);
            var countChannels = await _context.dvr.AsQueryable().AsNoTracking().SumAsync(d => d.status == 1 ? d.qtdeChannels : 0);
            var countFreeChannels = await _context.dvr.AsQueryable().AsNoTracking().SumAsync(d => (d.qtdeChannels - d.activeCams > 0 && d.status == 1) ? d.qtdeChannels - d.activeCams : 0);
            var countCams = await _context.dvr.AsQueryable().AsNoTracking().SumAsync(d => d.status == 1 ? d.activeCams : 0);

            return new InfoDVRDTO(countDVR, coutnDVRFull, countChannels, countFreeChannels, countCams);
        }

        public async Task<FilterGetDVRDTO> GetFilterFillDVR()
        {
            var hdSizes = await _context.dvr.GroupBy(d => d.hdSize).OrderBy(d => d.Key).Select(d => d.Key).ToListAsync();
            var channels = await _context.dvr.GroupBy(d => d.qtdeChannels).OrderBy(d => d.Key).Select(d => d.Key).ToListAsync();

            return new FilterGetDVRDTO(hdSizes, channels);
        }

        public IQueryable<DVR> GetFilterDVR(FilterDTO<DVRFilterDTO> filter)
        {
            var dvrQueryable = _context.dvr.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var s = searchDto.search.ToLower();

                dvrQueryable = searchDto.attributte switch
                {
                    "code" => dvrQueryable.Where(d => d.code.ToLower().Contains(s)),
                    "localion" => dvrQueryable.Where(d => d.location.ToLower().Contains(s)),
                    "brand" => dvrQueryable.Where(d => d.brand.ToLower().Contains(s)),
                    "dvrIP" => dvrQueryable.Where(d => d.dvrIP.ToLower().Contains(s)),
                    "dvrPort" => dvrQueryable.Where(d => d.dvrPort.ToLower().Contains(s)),
                    "model" => dvrQueryable.Where(d => d.model != null && d.model.ToLower().Contains(s)),
                    "dvrUser" => dvrQueryable.Where(d => d.dvrUser.ToLower().Contains(s)),
                    "dvrPassword" => dvrQueryable.Where(d => d.dvrPassword.ToLower().Contains(s)),
                    "assetNumber" => dvrQueryable.Where(d => d.assetNumber != null && d.assetNumber.ToLower().Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                DVRFilterDTO extra = filter.extra;

                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    dvrQueryable = dvrQueryable.Where(d => d.status == extra.statusFilter);
                }

                if (extra.hasBalun != (int)HasBalunEnum.noFilter)
                {
                    dvrQueryable = dvrQueryable.Where(d => extra.hasBalun == (int)HasBalunEnum.onlyHasBalun ? d.hasBalun : !d.hasBalun);
                }

                if (extra.toHdSize >= 0)
                {
                    dvrQueryable = dvrQueryable.Where(r => r.hdSize <= extra.toHdSize);
                }
      
                if (extra.toChannels >= 0)
                {
                    dvrQueryable = dvrQueryable.Where(r => r.qtdeChannels <= extra.toChannels);
                }

                if (extra.fromActiveCams != null)
                {
                    dvrQueryable = dvrQueryable.Where(r => r.activeCams >= extra.fromActiveCams);
                }

                if (extra.toActiveCams != null && (extra.fromActiveCams == null || extra.toActiveCams >= extra.fromActiveCams))
                {
                    dvrQueryable = dvrQueryable.Where(r => r.activeCams <= extra.toActiveCams);
                }

                if (extra.fromAcquisitionDate != null)
                {
                    dvrQueryable = dvrQueryable.Where(r => r.acquisitionDate >= extra.fromAcquisitionDate);
                }

                if (extra.toAcquisitionDate != null && (extra.fromAcquisitionDate == null || extra.toAcquisitionDate >= extra.fromAcquisitionDate))
                {
                    dvrQueryable = dvrQueryable.Where(r => r.acquisitionDate <= extra.toAcquisitionDate);
                }

                if (extra.fromLastPreventive != null)
                {
                    dvrQueryable = dvrQueryable.Where(r => r.lastPreventive >= extra.fromLastPreventive);
                }

                if (extra.toLastPreventive != null && (extra.fromLastPreventive == null || extra.toLastPreventive >= extra.fromLastPreventive))
                {
                    dvrQueryable = dvrQueryable.Where(r => r.lastPreventive <= extra.toLastPreventive);
                }
            }

            return dvrQueryable;
        }

        public async Task AddDevice(DVR newDVR)
        {
            try
            {
                if (newDVR == null) throw new Exception("Nova inserção não pode ser nula.");

                var dVerify = await _context.dvr.FirstOrDefaultAsync(d => d.code == newDVR.code);

                if (dVerify != null) throw new Exception("Já existe DVR com este código.");

                newDVR.createdAt = DateTime.Now;
                newDVR.updatedAt = DateTime.Now;

                await _context.dvr.AddAsync(newDVR);
                await _context.SaveChangesAsync();

                // Add One Preventive
                if (newDVR.lastPreventive != null)
                {
                    DVRPreventive preventive = new DVRPreventive(
                        null,
                        preventiveDate: newDVR.lastPreventive.GetValueOrDefault(),
                        ticketId: newDVR.ticketId,
                        dvrId: newDVR.id
                    );

                    await this.AddPreventive(preventive, newDVR);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção do DVR: " + ex.Message);
            }
        }

        public async Task UpdateDevice(DVR upDVR)
        {
            try
            {
                if (upDVR == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var dvr = await _context.dvr.FirstOrDefaultAsync(d => d.id == upDVR.id);

                if (dvr == null) throw new Exception("DVR não encontrado.");

                var dVerify = await _context.dvr.FirstOrDefaultAsync(d => d.code == upDVR.code);

                if (dVerify != null && dVerify.id != dvr.id) throw new Exception("Já existe DVR com este novo código.");

                dvr.code = upDVR.code;
                dvr.location = upDVR.location;
                dvr.brand = upDVR.brand;
                dvr.model = upDVR.model;
                dvr.qtdeChannels = upDVR.qtdeChannels;
                dvr.hdSize = upDVR.hdSize;
                dvr.activeCams = upDVR.activeCams;
                dvr.hasBalun = upDVR.hasBalun;
                dvr.dvrIP = upDVR.dvrIP;
                dvr.dvrPort = upDVR.dvrPort;
                dvr.dvrUser = upDVR.dvrUser;
                dvr.dvrPassword = upDVR.dvrPassword;
                dvr.status = upDVR.status;
                dvr.assetNumber = upDVR.assetNumber;
                dvr.acquisitionDate = upDVR.acquisitionDate;
                dvr.lastPreventive = upDVR.lastPreventive;
                dvr.ticketId = upDVR.ticketId;
                dvr.notes = upDVR.notes;
                dvr.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();

                var preventives = await _context.dvrPreventive
                    .Where(p => p.dvrId == dvr.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();


                if (dvr.lastPreventive != null)
                {
                    if (preventives == null || preventives.Count == 0 || preventives[0].preventiveDate != dvr.lastPreventive)
                    {
                        DVRPreventive preventive = new DVRPreventive(
                            null,
                            preventiveDate: dvr.lastPreventive.GetValueOrDefault(),
                            ticketId: dvr.ticketId,
                            dvrId: dvr.id
                        );

                        await this.AddPreventive(preventive, dvr);
                    }
                    else
                    {
                        if (preventives[0].ticketId != dvr.ticketId)
                        {
                            DVRPreventive preventive = new DVRPreventive(
                                preventives[0].id,
                                preventiveDate: dvr.lastPreventive.GetValueOrDefault(),
                                ticketId: dvr.ticketId,
                                dvrId: dvr.id
                            );

                            await this.UpdatePreventive(preventive, dvr);
                        }
                    }
                }
                else
                {
                    if (preventives != null && preventives.Count > 0)
                        await this.DeletePreventive(preventives[0].id, dvr);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração do DVR: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var dvr = await _context.dvr.FirstOrDefaultAsync(d => d.id == id);

                if (dvr == null) throw new Exception("DVR não encontrado.");

                _context.dvr.Remove(dvr);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção do DVR: " + ex.Message);
            }
        }

        /*** PREVENTIVES ***/

        public async Task<PreventiveDeviceReportDTO> GetPreventiveReport()
        {
            var preventivesDVRs = await _context.dvr
                .Where(d => d.status == (int)StatusEnum.active)
                .Select(d => new PreventiveDTO
                {
                    deviceCode = d.code,
                    deviceId = d.id,
                    lastPreventiveDate = d.lastPreventive != null ? d.lastPreventive : null,
                    dueDate = PreventiveDTO.setDueDate(d.lastPreventive, d.createdAt.GetValueOrDefault()),
                    ticketId = d.ticketId != null ? d.ticketId : "",
                    statusPreventive = PreventiveDTO.setStatusPreventive(d.lastPreventive, d.createdAt.GetValueOrDefault())
                })
                .OrderBy(p => p.deviceCode)
                .AsNoTracking()
                .ToListAsync();

            int total = preventivesDVRs.Count();
            int doneQtde = preventivesDVRs.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.done);
            int overdueQtde = preventivesDVRs.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.overdue);
            int todoQtde = preventivesDVRs.Count(p => p.statusPreventive == (int)StatusPreventiveEnum.todo);

            return new PreventiveDeviceReportDTO(preventivesDVRs, total, doneQtde, overdueQtde, todoQtde, null);
        }

        public IQueryable<DVR> GetPreventivesTodo()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var prevTodoDVR = _context.dvr.Where(d => d.status == (int)StatusEnum.active && (d.lastPreventive == null || d.lastPreventive < yearAgo));

            return prevTodoDVR;
        }

        public IQueryable<DVR> GetPreventivesDone()
        {
            DateTime now = DateTime.Now;

            DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

            var prevDoneDVR = _context.dvr.Where(d => d.status == (int)StatusEnum.active && d.lastPreventive >= yearAgo);

            return prevDoneDVR;
        }

        public IQueryable<DVR> GetPreventivesFiltered(IQueryable<DVR> queryable, ICollection<string> searches)
        {
            var filterQuery = queryable;

            foreach (var search in searches)
            {
                filterQuery = filterQuery.Where(d => d.code.Contains(search.ToLower()));
            }

            return filterQuery;
        }

        public async Task<List<DVR>> GetPaginatedPreventives(IQueryable<DVR> queryable, PaginationDTO paginate)
        {
            var preventivesDVR = await queryable
                                .Include(d => d.preventives)
                                .Select(d => new DVR
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

            return preventivesDVR;
        }

        public async Task AddPreventive(DVRPreventive newPreventive)
        {
            try
            {
                var dvr = await _context.dvr.FirstOrDefaultAsync(d => d.id == newPreventive.dvrId);
                if (dvr == null) throw new Exception("DVR não existe");

                if (dvr.lastPreventive == null || dvr.lastPreventive < newPreventive.preventiveDate)
                {
                    dvr.lastPreventive = newPreventive.preventiveDate;
                    dvr.ticketId = newPreventive.ticketId;
                }

                await _context.dvrPreventive.AddAsync(newPreventive);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao adicionar a Preventiva ao DVR: " + ex.Message);
            }
        }

        // ADD Preventive Isomorfo
        public async Task AddPreventive(DVRPreventive newPreventive, DVR dvr)
        {
            try
            {
                if (dvr.lastPreventive == null || dvr.lastPreventive < newPreventive.preventiveDate)
                {
                    dvr.lastPreventive = newPreventive.preventiveDate;
                    dvr.ticketId = newPreventive.ticketId;
                }

                await _context.dvrPreventive.AddAsync(newPreventive);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao adicionar a Preventiva ao DVR: " + ex.Message);
            }
        }

        public async Task UpdatePreventive(DVRPreventive upPreventive)
        {
            try
            {
                var dvr = await _context.dvr.FirstOrDefaultAsync(d => d.id == upPreventive.dvrId);
                if (dvr == null) throw new Exception("DVR não existe");

                var preventive = await _context.dvrPreventive.FirstOrDefaultAsync(p => p.id == upPreventive.id);
                if (preventive == null) throw new Exception("Preventiva não existe");

                preventive.preventiveDate = upPreventive.preventiveDate;
                preventive.ticketId = upPreventive.ticketId;

                await _context.SaveChangesAsync();

                // Save the last preventive as the last preventive in the computer table

                var preventives = await _context.dvrPreventive
                   .Where(p => p.dvrId == dvr.id)
                   .OrderByDescending(p => p.preventiveDate)
                   .Take(1)
                   .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    dvr.lastPreventive = preventives[0].preventiveDate;
                    dvr.ticketId = preventives[0].ticketId;
                }
                else
                {
                    dvr.lastPreventive = null;
                    dvr.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar a Preventiva ao DVR: " + ex.Message);
            }
        }

        // Update Computer Isomorfo
        public async Task UpdatePreventive(DVRPreventive upPreventive, DVR dvr)
        {
            try
            {
                var preventive = await _context.dvrPreventive.FirstOrDefaultAsync(p => p.id == upPreventive.id);
                if (preventive == null) throw new Exception("Preventiva não existe");

                preventive.preventiveDate = upPreventive.preventiveDate;
                preventive.ticketId = upPreventive.ticketId;

                await _context.SaveChangesAsync();

                // Save the last preventive as the last preventive in the computer table

                var preventives = await _context.dvrPreventive
                   .Where(p => p.dvrId == dvr.id)
                   .OrderByDescending(p => p.preventiveDate)
                   .Take(1)
                   .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    dvr.lastPreventive = preventives[0].preventiveDate;
                    dvr.ticketId = preventives[0].ticketId;
                }
                else
                {
                    dvr.lastPreventive = null;
                    dvr.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao atualizar a Preventiva ao DVR: " + ex.Message);
            }
        }

        public async Task DeletePreventive(int preventiveId, int dvrId)
        {
            try
            {
                var dvr = await _context.dvr.FirstOrDefaultAsync(d => d.id == dvrId);
                if (dvr == null) throw new Exception("DVR não existe");

                var preventive = await _context.dvrPreventive.FirstOrDefaultAsync(p => p.id == preventiveId);
                if (preventive == null) throw new Exception("Preventiva não existe");

                _context.dvrPreventive.Remove(preventive);

                await _context.SaveChangesAsync();

                var preventives = await _context.dvrPreventive
                    .Where(p => p.dvrId == dvr.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    dvr.lastPreventive = preventives[0].preventiveDate;
                    dvr.ticketId = preventives[0].ticketId;
                }
                else
                {
                    dvr.lastPreventive = null;
                    dvr.ticketId = null;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas ao remover a Preventiva do Nobreak: " + ex.Message);
            }
        }

        // Delete Preventive Isomorfo
        public async Task DeletePreventive(int preventiveId, DVR dvr)
        {
            try
            {
                var preventive = await _context.dvrPreventive.FirstOrDefaultAsync(p => p.id == preventiveId);
                if (preventive == null) throw new Exception("Preventiva não existe");

                _context.dvrPreventive.Remove(preventive);

                await _context.SaveChangesAsync();

                var preventives = await _context.dvrPreventive
                    .Where(p => p.dvrId == dvr.id)
                    .OrderByDescending(p => p.preventiveDate)
                    .Take(1)
                    .ToListAsync();

                if (preventives != null && preventives.Count > 0)
                {
                    dvr.lastPreventive = preventives[0].preventiveDate;
                    dvr.ticketId = preventives[0].ticketId;
                }
                else
                {
                    dvr.lastPreventive = null;
                    dvr.ticketId = null;
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
