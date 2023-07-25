using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class ComputerCreationDTO
    {
        public int? id { get; set; }
        public string code { get; set; } = string.Empty;
        public int computerType { get; set; }
        public int memorySize { get; set; }
        public string operationalSystem { get; set; } = String.Empty;
        public int rankOperationalSystem { get; set; }
        public int status { get; set; }
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public DateTime? lastPreventiveDate { get; set; }
        public string? ticketId { get; set; }
        public string? notes { get; set; }

        public int? departmentId { get; set; }
        public int? employeeId { get; set; }
        public int profileId { get; set; }

        public virtual ProcessingUnitCreationDTO processingUnit { get; set; } = new ProcessingUnitCreationDTO();
        public virtual StorageCreationDTO storage { get; set; } = new StorageCreationDTO();

        public virtual ICollection<MemoryCreationDTO> memories { get; set; } = new HashSet<MemoryCreationDTO>();
    }
}
