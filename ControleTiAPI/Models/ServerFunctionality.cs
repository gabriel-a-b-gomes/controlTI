using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class ServerFunctionality
    {
        public int id { get; set; }
        [StringLength(maximumLength: 150)]
        public string description { get; set; } = String.Empty;
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }

        public virtual ICollection<VMFunctionalities> virtualMachines { get; private set; }
        public virtual ICollection<HostFuncionalities> hosts { get; private set; }

        public ServerFunctionality()
        {
            this.virtualMachines = new HashSet<VMFunctionalities>();
            this.hosts = new HashSet<HostFuncionalities>();
        }
    }
}
