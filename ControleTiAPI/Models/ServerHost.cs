using ControleTiAPI.DTOs;
using ControleTiAPI.Models.Preventives;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class ServerHost
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; }
        [StringLength(maximumLength: 50)]
        public string machineBrand { get; set; }
        [StringLength(maximumLength: 100)]
        public string machineModel { get; set; }
        public int memorySize { get; set; }
        public int storageSize { get; set; }
        [StringLength(maximumLength: 200)]
        public string processorModelDescription { get; set; }
        [StringLength(maximumLength: 50)]
        public string processorFrequency { get; set; }
        [StringLength(maximumLength: 150)]
        public string operationalSystemDescription { get; set; }

        public DateTime? lastPreventiveDate { get; set; }
        public string? ticketId { get; set; }
        public DateTime? acquisitionDate { get; set; }

        public int status { get; set; }
        [StringLength(maximumLength: 100)]
        public string? assetNumber { get; set; }
        public string? notes { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }

        public virtual ICollection<ServerMemory> memories { get; set; }
        public virtual ICollection<ServerStorage> storages { get; set; }
        public virtual ICollection<HostFuncionalities> functionalities { get; set; }
        public virtual ICollection<ServerPreventive> preventives { get; set; }
        public virtual ICollection<ServerVM> virtualMachines { get; private set; }

        public ServerHost()
        {
            code = String.Empty;
            machineBrand = String.Empty;
            machineModel = String.Empty;
            processorFrequency = String.Empty;
            processorModelDescription = String.Empty;
            operationalSystemDescription = String.Empty;
            memories = new HashSet<ServerMemory>();
            storages = new HashSet<ServerStorage>();
            functionalities = new HashSet<HostFuncionalities>();
            preventives = new HashSet<ServerPreventive>();
            virtualMachines = new HashSet<ServerVM>();
        }

        public ServerHost(ServerHostCreationDTO host)
        {
            if (host.id != null) id = host.id.GetValueOrDefault();

            code = host.code;
            machineBrand = host.machineBrand;
            machineModel = host.machineModel;
            storageSize = host.storageSize;
            memorySize = host.memorySize;
            processorModelDescription = host.processorModelDescription;
            processorFrequency = host.processorFrequency;
            operationalSystemDescription = host.operationalSystemDescription;
            lastPreventiveDate = host.lastPreventiveDate;
            ticketId = host.ticketId;
            acquisitionDate = host.acquisitionDate;

            status = host.status;
            assetNumber = host.assetNumber;
            notes = host.notes;

            functionalities = new HashSet<HostFuncionalities>();
            foreach (var funcId in host.funcsIds)
            {
                var f = new HostFuncionalities();
                f.functionalityId = funcId;
                functionalities.Add(f);
            }

            memories = new HashSet<ServerMemory>();
            foreach (var memory in host.memories)
            {
                memories.Add(new ServerMemory(memory, this));
            }

            storages = new HashSet<ServerStorage>();
            foreach (var storage in host.storages)
            {
                storages.Add(new ServerStorage(storage, this));
            }
        }
    }
}
