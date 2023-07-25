using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class RamalCreationDTO
    {
        public int? id { get; set; }
        public string number { get; set; } = String.Empty;
        public string? model { get; set; }
        public string exitNumber { get; set; } = String.Empty;
        public bool isDepartment { get; set; }
        public string deviceIP { get; set; } = String.Empty;
        public string deviceConfig { get; set; } = String.Empty;
        public string deviceUser { get; set; } = String.Empty;
        public string devicePassword { get; set; } = String.Empty;
        public int status { get; set; }
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public string? notes { get; set; }

        public int departmentId { get; set; }
        public int? employeeId { get; set; }
    }
}
