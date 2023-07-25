using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.Models
{
    public class Router
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string location { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string brand { get; set; } = String.Empty;
        [StringLength(maximumLength: 75)]
        public string routerIP { get; set; } = String.Empty;
        [StringLength(maximumLength: 75)]
        public string routerSSID { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string? routerMAC { get; set; }
        [StringLength(maximumLength: 75)]
        public string routerUser { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string routerPassword { get; set; } = String.Empty;
        public int status { get; set; }
        [StringLength(maximumLength: 100)]
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public string? notes { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}
