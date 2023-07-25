using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class NetworkNodeCreationDTO
    {
        public int? id { get; set; }
        public string code { get; set; } = String.Empty;
        public string location { get; set; } = String.Empty;
        public int switchPort { get; set; }
        public string? patchPanelLocation { get; set; }
        public int? patchPanelPort { get; set; }
        public string? patchPanelNodeId { get; set; }
        public string? notes { get; set; }
        public int switchId { get; set; }
        public int? employeeId { get; set; }
    }
}
