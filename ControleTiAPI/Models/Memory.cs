using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class Memory
    {
        public int id { get; set; }
        [StringLength(maximumLength: 200)]
        public string model { get; set; } = String.Empty;
        public int memoryPentSize { get; set; }

        public virtual ICollection<ComputerMemory> computers { get; private set; }
        public virtual ICollection<ServerMemory> servers { get; private set; }

        public Memory()
        {
            servers = new HashSet<ServerMemory>();
            computers = new HashSet<ComputerMemory>();
        }
    }
}
