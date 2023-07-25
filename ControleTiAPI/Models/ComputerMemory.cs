using ControleTiAPI.DTOs;

namespace ControleTiAPI.Models
{
    public class ComputerMemory
    {
        public int computerId { get; set; }
        public int memoryId { get; set; }
        public int qtde { get; set; }

        public virtual Computer computer { get; set; }
        public virtual Memory memory { get; set; }

        public ComputerMemory() { }

        public ComputerMemory(MemoryCreationDTO memory, Computer computer)
        {
            this.qtde = memory.qtde;
            this.computer = computer;
            this.memory = new Memory
            {
                model = memory.model,
                memoryPentSize = memory.memoryPentSize,
            };
        }
    }
}
