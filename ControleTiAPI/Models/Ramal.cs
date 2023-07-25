using ControleTiAPI.DTOs;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.Models
{
    public class Ramal
    {
        public int id { get; set; }
        [StringLength(maximumLength: 75)]
        public string number { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string? model { get; set; }
        [StringLength(maximumLength: 75)]
        public string exitNumber { get; set; } = String.Empty;
        public bool isDepartment { get; set; }
        [StringLength(maximumLength: 75)]
        public string deviceIP { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string deviceConfig { get; set; } = String.Empty;
        [StringLength(maximumLength: 75)]
        public string deviceUser { get; set; } = String.Empty;
        [StringLength(maximumLength: 75)]
        public string devicePassword { get; set; } = String.Empty;
        public int status { get; set; }
        [StringLength(maximumLength: 100)]
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public string? notes { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }

        [ForeignKey("department")]
        public int departmentId { get; set; }
        [ForeignKey("employee")]
        public int? employeeId { get; set; }

        [InverseProperty("ramals")]
        public virtual Department department { get; set; }
        [InverseProperty("ramals")]
        public virtual Employee? employee { get; set; }

        public Ramal()
        {
        }

        public Ramal(RamalCreationDTO ramal)
        {
            if (ramal.id != null)
            {
                this.id = ramal.id.GetValueOrDefault();
            }

            this.number = ramal.number;
            this.model = ramal.model;
            this.exitNumber = ramal.exitNumber;
            this.isDepartment = ramal.isDepartment;
            this.deviceIP = ramal.deviceIP;
            this.deviceConfig = ramal.deviceConfig;
            this.deviceUser = ramal.deviceUser;
            this.devicePassword = ramal.devicePassword;
            this.status = ramal.status;
            this.assetNumber = ramal.assetNumber;
            this.acquisitionDate = ramal.acquisitionDate;
            this.notes = ramal.notes;

            this.departmentId = ramal.departmentId;
            if (ramal.employeeId != null && ramal.employeeId > 0)
            {
                this.employeeId = ramal.employeeId;
            }
        }
    }
}
