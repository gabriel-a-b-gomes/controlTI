namespace ControleTiAPI.IServices
{
    public interface IProcessingUnitService
    {
        Task<ProcessingUnit> CheckOrAddProcessor(ProcessingUnit processingUnit);
    }
}
