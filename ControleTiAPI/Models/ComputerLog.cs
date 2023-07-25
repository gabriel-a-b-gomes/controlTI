using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class ComputerLog
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string department { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string enterprise { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string employee { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string processingUnit { get; set; } = String.Empty;
        [StringLength(maximumLength: 300)]
        public string operationalSystem { get; set; } = String.Empty;
        [StringLength(maximumLength: 150)]
        public string computerProfile { get; set; } = String.Empty;
        public int memorySize { get; set; }
        public int storageSize { get; set; }
        [StringLength(maximumLength: 50)]
        public string storageType { get; set; } = String.Empty;
        public bool isGood { get; set; }
        public int status { get; set; }
        public DateTime updatedAt { get; set; }
        public int computerId { get; set; }
        public virtual Computer computer { get; set; }
    }
}
