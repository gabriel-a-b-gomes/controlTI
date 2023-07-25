using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.DTOs
{
    public class NobreakCreationDTO
    {
        public int? id { get; set; }
        public string code { get; set; } = String.Empty;
        public string location { get; set; } = String.Empty;
        public string brand { get; set; } = String.Empty;
        public string model { get; set; } = String.Empty;
        public int qtdeVA { get; set; }
        [NotNull]
        public bool isSenoidal { get; set; } = false;
        public int? typeOfUse { get; set; }
        public int status { get; set; }
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public DateTime? lastPreventive { get; set; }
        public string? ticketId { get; set; }
        public string? notes { get; set; }
    }
}
