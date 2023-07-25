namespace ControleTiAPI.DTOs.Filters
{
    public class PrinterFilterDTO
    {
        public int type { get; set; }
        public int statusFilter { get; set; }
        public string? printerIp { get; set; }
        public string? printerUser { get; set; }
        public string? printerPassword { get; set; }
        public DateTime? fromAcquisitionDate { get; set; }
        public DateTime? toAcquisitionDate { get; set; }
    }
}
