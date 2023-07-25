namespace ControleTiAPI.DTOs.Filters
{
    public class RamalFilterDTO
    {
        public string configExitNumber { get; set; } = string.Empty;
        public int classifyRamal { get; set; }
        public int statusFilter { get; set; }
        public string? configIp { get; set; } = String.Empty;
        public string? configGateway { get; set; } = String.Empty;
        public DateTime? fromAcquisitionDate { get; set; }
        public DateTime? toAcquisitionDate { get; set; }
    }
}
