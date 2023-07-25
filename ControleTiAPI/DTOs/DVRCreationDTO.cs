using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class DVRCreationDTO
    {
        public int? id { get; set; }
        public string code { get; set; } = String.Empty;
        public string location { get; set; } = String.Empty;
        public string brand { get; set; } = String.Empty;
        public string? model { get; set; }
        public int qtdeChannels { get; set; }
        public double hdSize { get; set; }
        public int activeCams { get; set; }
        public bool hasBalun { get; set; }
        public string dvrIP { get; set; } = String.Empty;
        public string dvrPort { get; set; } = String.Empty;
        public string dvrUser { get; set; } = String.Empty;
        public string dvrPassword { get; set; } = String.Empty;
        public int status { get; set; }
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public DateTime? lastPreventive { get; set; }
        public string? ticketId { get; set; }
        public string? notes { get; set; }
    }
}
