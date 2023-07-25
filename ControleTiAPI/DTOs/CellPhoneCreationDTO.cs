using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class CellPhoneCreationDTO
    {
        public int? id { get; set; }
        public string model { get; set; } = String.Empty;
        public int memorySize { get; set; }
        public int storageSize { get; set; }
        public string processingUnit { get; set; } = String.Empty;
        public string operationalSystem { get; set; } = String.Empty;
    }
}
