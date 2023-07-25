using ControleTiAPI.DTOs;

namespace ControleTiAPI.Models
{
    public class ServerMemory
    {
        public int serverHostId { get; set; }
        public int memoryId { get; set; }
        public int qtde { get; set; }

        public virtual ServerHost host { get; set; }
        public virtual Memory memory { get; set; }

        public ServerMemory() { }

        public ServerMemory(MemoryCreationDTO memory, ServerHost host)
        {
            this.qtde = memory.qtde;
            this.host = host;
            this.memory = new Memory
            {
                model = memory.model,
                memoryPentSize = memory.memoryPentSize,
            };
        }
    }
}
