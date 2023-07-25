using ControleTiAPI.DTOs;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.Models
{
    public class Chip
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string number { get; set; } = String.Empty;
        public int status { get; set; }
        [StringLength(maximumLength: 100)]
        public string account { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string type { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string acctualICCID { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public string? notes { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }

        [ForeignKey("department")]
        public int? departmentId { get; set; }
        [ForeignKey("employee")]
        public int? employeeId { get; set; }
        [ForeignKey("cellPhone")]
        public int? cellphoneId { get; set; }

        [InverseProperty("chips")]
        public virtual Department? department { get; set; }
        [InverseProperty("chips")]
        public virtual Employee? employee { get; set; }
        [InverseProperty("chips")]
        public virtual CellPhone? cellPhone { get; set; }

        public Chip() { }

        public Chip(ChipCreationDTO chip)
        {
            if (chip.id != null)
            {
                this.id = chip.id.GetValueOrDefault();
            }

            this.number = chip.number;
            this.account = chip.account;
            this.status = chip.status;
            this.type = chip.type;
            this.acctualICCID = chip.acctualICCID;
            this.assetNumber = chip.assetNumber;
            this.acquisitionDate = chip.acquisitionDate;
            this.notes = chip.notes;

            if (chip.departmentId != null && chip.departmentId > 0)
            {
                this.departmentId = chip.departmentId;
            }

            if (chip.employeeId != null && chip.employeeId > 0)
            {
                this.employeeId = chip.employeeId;
            }

            if (chip.cellPhone != null && !CellPhone.IsClearCellPhone(chip.cellPhone))
            {
                this.cellPhone = new CellPhone(chip.cellPhone);
            }
        }
    }
}
