using ControleTiAPI.IServices;

namespace ControleTiAPI.Services
{
    public class StorageService : IStorageService
    {
        private readonly DataContext _context;

        public StorageService(DataContext context)
        {
            _context = context;
        }

        private async Task<Storage> AddStorage(Storage newStorage)
        {
            try
            {
                if (newStorage == null) throw new Exception("Entrada nula. Celular não pode ser nulo.");

                await _context.storage.AddAsync(newStorage);
                await _context.SaveChangesAsync();

                return newStorage;
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na Inserção de Armazenamento: " + ex.Message);
            }
        }

        private async Task<Storage?> SearchForStorage(Storage searchStorage)
        {
            var storage = await _context.storage
                .FirstOrDefaultAsync(s =>
                    s.storageSize == searchStorage.storageSize &&
                    s.type == searchStorage.type &&
                    s.brand == searchStorage.brand
                );

            return storage;
        }

        public async Task<Storage> CheckOrAddStorage(Storage storage)
        {
            try
            {
                var sto = await this.SearchForStorage(storage);

                if (sto == null)
                    sto = await this.AddStorage(storage);

                return sto;
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas na chegagem de armazenamento: " + ex.Message);
            }
        }
    }
}
