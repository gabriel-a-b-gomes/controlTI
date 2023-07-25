using ControleTiAPI.IServices;

namespace ControleTiAPI.Services
{
    public class MemoryService : IMemoryService
    {
        private readonly DataContext _context;

        public MemoryService(DataContext context)
        {
            _context = context;
        }

        private async Task<Memory> AddMemory(Memory newMemory)
        {
            try
            {
                if (newMemory == null) throw new Exception("Entrada nula. Celular não pode ser nulo.");

                await _context.memory.AddAsync(newMemory);
                await _context.SaveChangesAsync();

                return newMemory;
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na Inserção da Memória: " + ex.Message);
            }
        }

        private async Task<Memory?> SearchForMemory(Memory searchMemory)
        {
            var memory = await _context.memory
                .FirstOrDefaultAsync(m =>
                    m.model == searchMemory.model &&
                    m.memoryPentSize == searchMemory.memoryPentSize
                );

            return memory;
        }

        public async Task<Memory> CheckOrAddMemory(Memory memory)
        {
            try
            {
                var memo = await this.SearchForMemory(memory);

                if (memo == null)
                    memo = await this.AddMemory(memory);

                return memo;
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na chegagem da memória: " + ex.Message);
            }
        }
    }
}
