namespace ControleTiAPI.IServices
{
    public interface IMemoryService
    {
        Task<Memory> CheckOrAddMemory(Memory memory);
    }
}
