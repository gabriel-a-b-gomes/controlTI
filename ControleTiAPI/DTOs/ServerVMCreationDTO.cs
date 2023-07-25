using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class ServerVMCreationDTO
    {
        public int? id { get; set; }
        public string code { get; set; } = String.Empty;
        public string operationalSystem { get; set; } = String.Empty;
        public int memorySize { get; set; }
        public double storageSize { get; set; }
        public DateTime? setupDate { get; set; }
        public int status { get; set; }
        public string? notes { get; set; }

        public int serverHostId { get; set; }
        public virtual ICollection<int> funcsIds { get; set; } = new HashSet<int>();
    }
}
