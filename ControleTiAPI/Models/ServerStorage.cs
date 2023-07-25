using ControleTiAPI.DTOs;

namespace ControleTiAPI.Models
{
    public class ServerStorage
    {
        public int serverHostId { get; set; }
        public int storageId { get; set; }
        public int qtde { get; set; }

        public virtual ServerHost host { get; set; }
        public virtual Storage storage { get; set; }

        public ServerStorage() { }

        public ServerStorage(StorageCreationDTO storage, ServerHost host)
        {
            this.qtde = storage.qtde.GetValueOrDefault();
            this.host = host;
            this.storage = new Storage
            {
                brand = storage.brand,
                type = storage.type,
                storageSize = storage.storageSize
            };
        }

    }
}
