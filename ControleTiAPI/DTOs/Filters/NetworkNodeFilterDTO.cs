namespace ControleTiAPI.DTOs.Filters
{
    public class NetworkNodeFilterDTO
    {
        public int statusFilter { get; set; }
        public int switchId { get; set; }
        public string patchPanel { get; set; } = "all";
        public int? fromPorts { get; set; }
        public int? toPorts { get; set; }
        public int? fromPatchPort { get; set; }
        public int? toPatchPort { get; set; }
    }
}
