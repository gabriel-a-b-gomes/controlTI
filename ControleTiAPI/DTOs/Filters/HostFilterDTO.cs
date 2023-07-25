namespace ControleTiAPI.DTOs.Filters
{
    public class HostFilterDTO
    {
        public int hostFunctionality { get; set; }
        public int vmFunctionality { get; set; }
        public int statusFilter { get; set; }
        public int? fromMemorySize { get; set; }
        public int? toMemorySize { get; set; }
        public int? fromStorageSize { get; set; }
        public int? toStorageSize { get; set; }
        public DateTime? fromAcquisitionDate { get; set; }
        public DateTime? toAcquisitionDate { get; set; }
        public DateTime? fromLastPreventive { get; set; }
        public DateTime? toLastPreventive { get; set; }
    }
}
