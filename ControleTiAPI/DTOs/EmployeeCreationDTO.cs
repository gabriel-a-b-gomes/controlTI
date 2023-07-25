using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.DTOs
{
    public class EmployeeCreationDTO
    {
        public int? id { get; set; }
        public string name { get; set; } = String.Empty;
        public string displayName { get; set; } = String.Empty;
        public string email { get; set; } = String.Empty;
        public string emailPassword { get; set; } = String.Empty;
        public string? alternativeEmail { get; set; }
        public string? alternativeEmailPassword { get; set; }
        public int status { get; set; }
        public DateTime? ingressDate { get; set; }
        public string? notes { get; set; }
        public int departmentId { get; set; }
        [AllowNull]
        public virtual SkypeCreatingDTO? skype { get; set; }
        [AllowNull]
        public virtual VpnCreationDTO? vpn { get; set; }
    }
}
