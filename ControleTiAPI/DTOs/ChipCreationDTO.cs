using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class ChipCreationDTO
    {
        public int? id { get; set; }
        public string number { get; set; } = String.Empty;
        public int status { get; set; }
        public string account { get; set; } = String.Empty;
        public string type { get; set; } = String.Empty;
        public string acctualICCID { get; set; } = String.Empty;
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public string? notes { get; set; }

        public int? departmentId { get; set; }
        public int? employeeId { get; set; }
        public virtual CellPhoneCreationDTO? cellPhone { get; set; }
    }
}
