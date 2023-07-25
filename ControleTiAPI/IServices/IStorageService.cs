namespace ControleTiAPI.IServices
{
    public interface IStorageService
    {
        Task<Storage> CheckOrAddStorage(Storage storage);
    }
}
