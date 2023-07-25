using ControleTiAPI.DTOs;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class ServerVM
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; }
        [StringLength(maximumLength: 150)]
        public string operationalSystem { get; set; }
        public int memorySize { get; set; }
        public double storageSize { get; set; }
        public DateTime? setupDate { get; set; }
        public int status { get; set; } 
        public string? notes { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }

        public int serverHostId { get; set; }
        public virtual ServerHost host { get; set; }
        public virtual ICollection<VMFunctionalities> functionalities { get; set; }

        public ServerVM()
        {
            code = String.Empty;
            operationalSystem = String.Empty;
            host = new ServerHost();
            functionalities = new HashSet<VMFunctionalities>();
        }

        public ServerVM(ServerVMCreationDTO virtualMachine)
        {
            if (virtualMachine.id != null)
                id = virtualMachine.id.GetValueOrDefault();
            code = virtualMachine.code;
            operationalSystem = virtualMachine.operationalSystem;
            memorySize = virtualMachine.memorySize;
            storageSize = virtualMachine.storageSize;
            setupDate = virtualMachine.setupDate;
            status = virtualMachine.status;
            notes = virtualMachine.notes;

            serverHostId = virtualMachine.serverHostId;

            functionalities = new HashSet<VMFunctionalities>();
            foreach (var funcId in virtualMachine.funcsIds)
            {
                var f = new VMFunctionalities();
                f.functionalityId = funcId;
                functionalities.Add(f);
            }
        }
    }
}
