using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class ComputerProfile
    {
        public int id { get; set; }
        [StringLength(maximumLength: 75)]
        public string name { get; set; } = String.Empty;
        public int rankOfProcessingUnit { get; set; }
        public int memoryMinSize { get; set; }
        public int storageMinSize { get; set; }
        [StringLength(maximumLength: 40)]
        public string storageType { get; set; } = String.Empty;
        public int rankOfOperationSystem { get; set; }

        public virtual ICollection<Computer> computers { get; private set; }

        public ComputerProfile()
        {
            computers = new HashSet<Computer>();
        }
    }
}
