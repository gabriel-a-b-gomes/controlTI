namespace ControleTiAPI.DTOs.Filters
{
    public class NobreakFilterDTO
    {
        public int filterSenoidal { get; set; }
        public int typeOfUse { get; set; }
        public int statusFilter { get; set; }
        public int? fromQtdeVA { get; set; }
        public int? toQtdeVA { get; set; }
        public DateTime? fromAcquisitionDate { get; set; }
        public DateTime? toAcquisitionDate { get; set; }
        public DateTime? fromLastPreventive { get; set; }
        public DateTime? toLastPreventive { get; set; }
    }
}
