using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class ProcessingUnitCreationDTO
    {
        public int? id { get; set; }
        public string model { get; set; } = String.Empty;
        public string generation { get; set; } = String.Empty;
        public string frequency { get; set; } = String.Empty;
        public int rankProcessingUnit { get; set; }
    }
}
