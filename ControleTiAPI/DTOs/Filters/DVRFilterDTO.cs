namespace ControleTiAPI.DTOs.Filters
{
    public class DVRFilterDTO
    {
        public int statusFilter { get; set; }
        public int hasBalun { get; set; }
        public double toHdSize { get; set; }
        public int toChannels { get; set; }
        public int? fromActiveCams { get; set; }
        public int? toActiveCams { get; set; }
        public DateTime? fromAcquisitionDate { get; set; }
        public DateTime? toAcquisitionDate { get; set; }
        public DateTime? fromLastPreventive { get; set; }
        public DateTime? toLastPreventive { get; set; }
    }
}
