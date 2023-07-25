using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.Models
{
    public class Switches
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string location { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string brand { get; set; } = String.Empty;
        [StringLength(maximumLength: 75)]
        public string switchIP { get; set; } = String.Empty;
        public int qtdePorts { get; set; }
        [StringLength(maximumLength: 100)]
        public string? switchMAC { get; set; }  
        [StringLength(maximumLength: 75)]
        public string switchUser { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string switchPassword { get; set; } = String.Empty;
        public int status { get; set; }
        [StringLength(maximumLength: 100)]
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public string? notes { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }

        public virtual ICollection<NetworkNode> networkNodes { get; private set; }

        public Switches()
        {
            this.networkNodes = new HashSet<NetworkNode>();
        }
    }
}
