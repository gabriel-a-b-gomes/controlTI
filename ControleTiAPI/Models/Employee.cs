using ControleTiAPI.DTOs;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.Models
{
    public class Employee
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string name { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string displayName { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string email { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string emailPassword { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string? alternativeEmail { get; set; }
        [StringLength(maximumLength: 50)]
        public string? alternativeEmailPassword { get; set; }
        public int status { get; set; }
        public DateTime? ingressDate { get; set; }
        public string? notes { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
        public int departmentId { get; set; }
        public virtual Department department { get; set; }

        public virtual SkypeEmployee? skype { get; set; }
        public virtual VpnEmployee? vpn { get; set; }
        public virtual ICollection<NetworkNode> networkNodes { get; private set; }
        public virtual ICollection<Chip> chips { get; private set; }
        public virtual ICollection<Ramal> ramals { get; private set; }
        public virtual ICollection<Computer> computers { get; private set; }

        public Employee()
        {
            this.networkNodes = new HashSet<NetworkNode>();
            this.chips = new HashSet<Chip>();
            this.ramals = new HashSet<Ramal>();
            this.computers = new HashSet<Computer>();
        }

        public Employee(EmployeeCreationDTO employee)
        {
            if (employee.id != null)
                this.id = employee.id.GetValueOrDefault();
            this.name = employee.name;
            this.displayName = employee.displayName;
            this.email = employee.email;
            this.emailPassword = employee.emailPassword;
            this.alternativeEmail = employee.alternativeEmail;
            this.alternativeEmailPassword = employee.alternativeEmailPassword;
            this.status = employee.status;
            this.ingressDate = employee.ingressDate;
            this.notes = employee.notes;
            this.departmentId = employee.departmentId;
            if (employee.vpn != null && (employee.vpn?.vpnUser.Length > 0 && employee.vpn?.vpnPassword.Length > 0))
            {
                this.vpn = new VpnEmployee
                {
                    vpnUser = employee.vpn.vpnUser,
                    vpnPassword = employee.vpn.vpnPassword,
                    employee = this
                };

                if (employee.vpn.id != null)
                {
                    this.vpn.id = employee.vpn.id.GetValueOrDefault();
                }
            }
            else
            {
                this.vpn = null;
            }
            if (employee.skype != null && (employee.skype?.skypeUser.Length > 0 && employee.skype?.skypePassword.Length > 0))
            {
                this.skype = new SkypeEmployee
                {
                    skypeUser = employee.skype.skypeUser,
                    skypePassword = employee.skype.skypePassword,
                    employee = this
                };

                if (employee.skype.id != null)
                {
                    this.skype.id = employee.skype.id.GetValueOrDefault();
                }
            }
            else
            {
                this.skype = null;
            }
        }
    }
}
