using ControleTiAPI.DTOs;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class Storage
    {
        public int id { get; set; }
        [StringLength(maximumLength: 50)]
        public string type { get; set; } = String.Empty;
        [StringLength(maximumLength: 75)]
        public string brand { get; set; } = String.Empty;
        public int storageSize { get; set; }

        public virtual ICollection<Computer> computers { get; private set; }
        public virtual ICollection<ServerStorage> servers { get; private set; }

        public Storage()
        {
            servers = new HashSet<ServerStorage>();
            computers = new HashSet<Computer>();
        }

        public Storage(StorageCreationDTO storage)
        {
            this.brand = storage.brand;
            this.storageSize = storage.storageSize;
            this.type = storage.type;

            this.computers = new HashSet<Computer>();
        }
    }
}
