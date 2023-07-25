using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.Models
{
    public class Department
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string description { get; set; } = String.Empty;
        [StringLength(maximumLength: 75)]
        public string enterprise { get; set; } = String.Empty;
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }

        public virtual ICollection<Employee> employees { get; private set; }
        [ForeignKey("departmentId")]
        public virtual ICollection<Chip> chips { get; private set; }
        [ForeignKey("departmentId")]
        public virtual ICollection<Ramal> ramals { get; private set; }
        public virtual ICollection<Computer> computers { get; private set; }

        public Department()
        {
            this.employees = new HashSet<Employee>();
            this.chips = new HashSet<Chip>();
            this.ramals = new HashSet<Ramal>();
            this.computers = new HashSet<Computer>();
        }
    }
}
