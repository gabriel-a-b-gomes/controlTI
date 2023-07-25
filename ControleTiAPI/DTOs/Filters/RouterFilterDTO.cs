namespace ControleTiAPI.DTOs.Filters
{
    public class RouterFilterDTO
    {
        public int statusFilter { get; set; }
        public string routerSSID { get; set; } = "all";
        public string routerIp { get; set; } = String.Empty;
        public string routerUser { get; set; } = String.Empty;
        public string routerPassword { get; set; } = String.Empty;
        public DateTime? fromAcquisitionDate { get; set; }
        public DateTime? toAcquisitionDate { get; set; }
    }
}
