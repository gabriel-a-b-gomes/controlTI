namespace ControleTiAPI.DTOs.Filters
{
    public class SwitchFilterDTO
    {
        public int statusFilter { get; set; }
        public string switchIp { get; set; } = String.Empty;
        public string switchUser { get; set; } = String.Empty;
        public string switchPassword { get; set; } = String.Empty;
        public int? fromQtdePorts { get; set; }
        public int? toQtdePorts { get; set; }
        public int? fromUsedPorts { get; set; }
        public int? toUsedPorts { get; set; }
        public DateTime? fromAcquisitionDate { get; set; }
        public DateTime? toAcquisitionDate { get; set; }
    }
}
