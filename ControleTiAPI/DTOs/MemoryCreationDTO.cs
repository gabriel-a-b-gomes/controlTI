using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class MemoryCreationDTO
    {
        public int? id { get; set; }
        public string model { get; set; } = String.Empty;
        public int memoryPentSize { get; set; }
        public int qtde { get; set; }
    }
}
