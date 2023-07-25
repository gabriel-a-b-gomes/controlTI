namespace ControleTiAPI.IServices
{
    public interface ICellphoneService
    {
        Task<CellPhone> CheckOrAddCellPhone(CellPhone cellPhone);
    }
}
