using ControleTiAPI.IServices;

namespace ControleTiAPI.Services
{
    public class CellPhoneService : ICellphoneService
    {
        private readonly DataContext _context;

        public CellPhoneService(DataContext context)
        {
            _context = context;
        }

        private async Task<CellPhone> AddCellPhone(CellPhone newCellphone)
        {
            try
            {
                if (newCellphone == null) throw new Exception("Entrada nula. Celular não pode ser nulo.");

                await _context.cellPhone.AddAsync(newCellphone);
                await _context.SaveChangesAsync();

                return newCellphone;
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na Inserção do Celular > " + ex.Message);
            }
        }

        private async Task<CellPhone?> SearchForCellPhone(CellPhone searchCellPhone)
        {
            var cellPhone = await _context.cellPhone
                .FirstOrDefaultAsync(c =>
                    c.model == searchCellPhone.model &&
                    c.memorySize == searchCellPhone.memorySize &&
                    c.storageSize == searchCellPhone.storageSize &&
                    c.processingUnit == searchCellPhone.processingUnit &&
                    c.operationalSystem == searchCellPhone.operationalSystem
                );

            return cellPhone;
        }

        public async Task<CellPhone> CheckOrAddCellPhone(CellPhone phone)
        {
            try
            {
                var cellPhone = await this.SearchForCellPhone(phone);

                if (cellPhone == null)
                    cellPhone = await this.AddCellPhone(phone);

                return cellPhone;
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na chegagem > " + ex.Message);
            }
        }
    }
}
