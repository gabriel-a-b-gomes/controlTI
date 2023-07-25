using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class StorageCreationDTO
    {
        public int? id { get; set; }
        public string type { get; set; } = String.Empty;
        public string brand { get; set; } = String.Empty;
        public int storageSize { get; set; }
        public int? qtde { get; set; }
    }
}
