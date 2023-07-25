using ControleTiAPI.DTOs;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.Models
{
    public class NetworkNode
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string location { get; set; } = String.Empty;
        public int switchPort { get; set; }
        [StringLength(maximumLength: 200)]
        public string? patchPanelLocation { get; set; }
        public int? patchPanelPort { get; set; }
        [StringLength(maximumLength: 75)]
        public string? patchPanelNodeId { get; set; }
        public string? notes { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
        public int switchId { get; set; }
        public int? employeeId { get; set; }
        public virtual Switches switchOfNode { get; set; }
        public virtual Employee? employeeNetworkNode { get; set; }

        public NetworkNode()
        {
        }

        public NetworkNode(NetworkNodeCreationDTO node)
        {
            if (node.id != null)
            {
                this.id = node.id.GetValueOrDefault();
            }

            this.code = node.code;
            this.location = node.location;
            this.switchPort = node.switchPort;
            if (node.patchPanelLocation != null && node.patchPanelLocation.Length > 0)
                this.patchPanelLocation = node.patchPanelLocation;
            if (node.patchPanelPort != null)
                this.patchPanelPort = node.patchPanelPort;
            if (node.patchPanelNodeId != null && node.patchPanelNodeId.Length > 0)
                this.patchPanelNodeId = node.patchPanelNodeId;
            this.switchId = node.switchId;
            this.notes = node.notes;
            
            if (node.employeeId != null && node.employeeId > 0)
            {
                this.employeeId = node.employeeId;
            }
        }
    }
}
