using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class Printer
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string location { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string model { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string brand { get; set; } = String.Empty;
        public int type { get; set; }
        [StringLength(maximumLength: 100)]
        public string? supplies { get; set; }
        [StringLength(maximumLength: 100)]
        public string? printerUser { get; set; }
        [StringLength(maximumLength: 100)]
        public string? printerPassword { get; set; }
        [StringLength(maximumLength: 100)]
        public string? printerIP { get; set; }
        public int status { get; set; }
        [StringLength(maximumLength: 100)]
        public string? assetNumber { get; set; }
        [StringLength(maximumLength: 200)]
        public string? serialNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public string? notes { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}
