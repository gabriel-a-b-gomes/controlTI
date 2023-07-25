using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class ServerHostCreationDTO
    {
        public int? id { get; set; }
        public string code { get; set; } = String.Empty;
        public string machineBrand { get; set; } = String.Empty;
        public string machineModel { get; set; } = String.Empty;

        public int memorySize { get; set; }
        public int storageSize { get; set; }

        public string processorModelDescription { get; set; } = String.Empty;
        public string processorFrequency { get; set; } = String.Empty;

        public string operationalSystemDescription { get; set; } = String.Empty;

        public DateTime? lastPreventiveDate { get; set; }
        public string? ticketId { get; set; }
        public DateTime? acquisitionDate { get; set; }

        public int status { get; set; }
        public string? assetNumber { get; set; }
        public string? notes { get; set; }

        public ICollection<int> funcsIds { get; set; } = new HashSet<int>();
        public virtual ICollection<MemoryCreationDTO> memories { get; set; } = new HashSet<MemoryCreationDTO>();
        public virtual ICollection<StorageCreationDTO> storages { get; set; } = new HashSet<StorageCreationDTO>();
    }
}
