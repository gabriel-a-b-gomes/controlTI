using ControleTiAPI.DTOs;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace ControleTiAPI.Models
{
    public class SkypeEmployee
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string skypeUser { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string skypePassword { get; set; } = String.Empty;
        public int employeeId { get; set; }
        public virtual Employee employee { get; set; }
    }
}
