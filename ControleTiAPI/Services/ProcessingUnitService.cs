using ControleTiAPI.IServices;

namespace ControleTiAPI.Services
{
    public class ProcessingUnitService : IProcessingUnitService
    {
        private readonly DataContext _context;

        public ProcessingUnitService(DataContext context)
        {
            _context = context;
        }

        private async Task<ProcessingUnit> AddProcessingUnit(ProcessingUnit newProcessingUnit)
        {
            try
            {
                if (newProcessingUnit == null) throw new Exception("Entrada nula. Celular não pode ser nulo.");

                await _context.processingUnit.AddAsync(newProcessingUnit);
                await _context.SaveChangesAsync();

                return newProcessingUnit;
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na Inserção de Processador: " + ex.Message);
            }
        }

        private async Task<ProcessingUnit?> SearchForProcessingUnit(ProcessingUnit searchProcessingUnit)
        {
            var processor = await _context.processingUnit
                .FirstOrDefaultAsync(p =>
                    p.model == searchProcessingUnit.model &&
                    p.generation == searchProcessingUnit.generation &&
                    p.frequency == searchProcessingUnit.frequency
                );

            return processor;
        }

        public async Task<ProcessingUnit> CheckOrAddProcessor(ProcessingUnit processingUnit)
        {
            try
            {
                var processor = await this.SearchForProcessingUnit(processingUnit);

                if (processor == null)
                    processor = await this.AddProcessingUnit(processingUnit);
                else
                {
                    processor.rankProcessingUnit = processingUnit.rankProcessingUnit;
                }

                return processor;
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na chegagem de Processador: " + ex.Message);
            }
        }
    }
}
