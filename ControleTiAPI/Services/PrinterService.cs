using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using ControleTiAPI.DTOs.Filters;
using ControleTiAPI.Helpers;
using ControleTiAPI.IServices;

namespace ControleTiAPI.Services
{
    public class PrinterService : IPrinterService
    {
        private readonly DataContext _context;

        public PrinterService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Printer>> GetPaginated(IQueryable<Printer> queryable, PaginationDTO paginate)
        {
            var printers = await queryable
                .OrderBy(p => p.code)
                .Paginate(paginate).ToListAsync();

            return printers;
        }

        public async Task<Printer?> GetDeviceById(int id)
        {
            var printer = await _context.printer.FirstOrDefaultAsync(p => p.id == id);

            return printer;
        }

        public IQueryable<Printer> GetFilterPrinter(FilterDTO<PrinterFilterDTO> filter)
        {
            var printerQueryable = _context.printer.AsQueryable();

            foreach (var searchDto in filter.searches)
            {
                var s = searchDto.search.ToLower();

                printerQueryable = searchDto.attributte switch
                {
                    "code" => printerQueryable.Where(p => p.code.ToLower().Contains(s)),
                    "location" => printerQueryable.Where(p => p.location.ToLower().Contains(s)),
                    "brand" => printerQueryable.Where(p => p.brand.ToLower().Contains(s)),
                    "model" => printerQueryable.Where(p => p.model.ToLower().Contains(s)),
                    "supplies" => printerQueryable.Where(p => p.supplies != null && p.supplies.ToLower().Contains(s)),
                    "assetnumber" => printerQueryable.Where(p => p.assetNumber != null && p.assetNumber.ToLower().Contains(s)),
                    "serialnumber" => printerQueryable.Where(p => p.serialNumber != null && p.serialNumber.ToLower().Contains(s)),
                    _ => throw new ArgumentException("Atributo não existe e não pode ser pesquisado."),
                };
            }

            if (filter.extra != null)
            {
                PrinterFilterDTO extra = filter.extra;

                if (extra.statusFilter != (int)StatusFilterEnum.all)
                {
                    printerQueryable = printerQueryable.Where(p => p.status == extra.statusFilter);
                }

                if (extra.type != (int)PrinterTypeFilterEnum.nofilter)
                {
                    printerQueryable = printerQueryable.Where(p => p.type == extra.type);
                }

                if (extra.printerIp?.Length > 0)
                {
                    printerQueryable = printerQueryable.Where(p => p.printerIP != null && p.printerIP.Contains(extra.printerIp));
                }

                if (extra.printerUser?.Length > 0)
                {
                    printerQueryable = printerQueryable.Where(p => p.printerUser != null && p.printerUser.Contains(extra.printerUser));
                }

                if (extra.printerPassword?.Length > 0)
                {
                    printerQueryable = printerQueryable.Where(p => p.printerPassword != null && p.printerPassword.Contains(extra.printerPassword));
                }

                if (extra.fromAcquisitionDate != null)
                {
                    printerQueryable = printerQueryable.Where(r => r.acquisitionDate >= extra.fromAcquisitionDate);
                }

                if (extra.toAcquisitionDate != null && (extra.fromAcquisitionDate == null || extra.toAcquisitionDate >= extra.fromAcquisitionDate))
                {
                    printerQueryable = printerQueryable.Where(r => r.acquisitionDate <= extra.toAcquisitionDate);
                }
            }

            return printerQueryable;
        }

        public async Task AddDevice(Printer newPrinter)
        {
            try
            {
                if (newPrinter == null) throw new Exception("Nova inserção não pode ser nula.");

                var verifing = await _context.printer.FirstOrDefaultAsync(p => p.code == newPrinter.code);

                if (verifing != null) throw new Exception("Já existe uma Impressora com este código.");

                newPrinter.createdAt = DateTime.Now;
                newPrinter.updatedAt = DateTime.Now;

                await _context.printer.AddAsync(newPrinter);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na inserção da Impressora: " + ex.Message);
            }
        }

        public async Task UpdateDevice(Printer upPrinter)
        {
            try
            {
                if (upPrinter == null) throw new Exception("Entrada nula. Por favor entrada não pode ser nula.");

                var printer = await _context.printer.FirstOrDefaultAsync(p => p.id == upPrinter.id);

                if (printer == null) throw new Exception("Impressora não encontrada.");

                var pVerify = await _context.printer.FirstOrDefaultAsync(p => p.code == upPrinter.code);

                if (pVerify != null && pVerify.id != printer.id) throw new Exception("Já existe uma Impressora com este novo código.");

                printer.code = upPrinter.code;
                printer.location = upPrinter.location;
                printer.model = upPrinter.model;
                printer.brand = upPrinter.brand;
                printer.type = upPrinter.type;
                printer.printerIP = upPrinter.printerIP;
                printer.printerUser = upPrinter.printerUser;
                printer.printerPassword = upPrinter.printerPassword;
                printer.supplies = upPrinter.supplies;
                printer.assetNumber = upPrinter.assetNumber;
                printer.serialNumber = upPrinter.serialNumber;
                printer.status = upPrinter.status;
                printer.acquisitionDate = upPrinter.acquisitionDate;
                printer.notes = upPrinter.notes;
                printer.updatedAt = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na alteração da Impressora: " + ex.Message);
            }
        }

        public async Task DeleteDevice(int id)
        {
            try
            {
                var printer = await _context.printer.FirstOrDefaultAsync(p => p.id == id);

                if (printer == null) throw new Exception("Impressora não encontrada.");

                _context.printer.Remove(printer);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na remoção da Impressora: " + ex.Message);
            }
        }
    }
}
