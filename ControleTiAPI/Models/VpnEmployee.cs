using ControleTiAPI.DTOs;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace ControleTiAPI.Models
{
    public class VpnEmployee
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string vpnUser { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string vpnPassword { get; set; } = String.Empty;
        public int employeeId { get; set; }
        public virtual Employee employee { get; set; }
    }
}
