namespace ControleTiAPI.DTOs.Filters
{
    public class ComputerFilterDTO
    {
        public int classification { get; set; }
        public int statusFilter { get; set; }
        public int computerTypeFilter { get; set; }
        public int profileFilter { get; set; }
        public string storageTypeFilter { get; set; } = String.Empty;
        public int? fromStorageSize { get; set; }
        public int? toStorageSize { get; set; }
        public int? fromMemorySize { get; set; }
        public int? toMemorySize { get; set; }
        public DateTime? fromLastPreventive { get; set; }
        public DateTime? toLastPreventive { get; set; }
    }
}
