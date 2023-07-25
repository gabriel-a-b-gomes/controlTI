using ControleTiAPI.DTOs.Preventives;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models.Preventives
{
    public class ComputerPreventive
    {
        public int id { get; set; }
        public DateTime preventiveDate { get; set; }
        [StringLength(maximumLength: 100)]
        public string ticketId { get; set; }
        public int computerId { get; set; }
        public Computer computer { get; set; }

        public ComputerPreventive()
        {
            this.preventiveDate = new DateTime();
            this.ticketId = String.Empty;
            this.computer = new Computer();
        }

        public ComputerPreventive(int? id, DateTime preventiveDate, string? ticketId, int computerId)
        {   
            if (id != null)
                this.id = id.GetValueOrDefault();
            this.preventiveDate = preventiveDate;
            this.ticketId = ticketId != null ? ticketId : "";
            this.computerId = computerId;
        }

        public ComputerPreventive(PreventiveCreationDTO preventive)
        {
            if (preventive.id != null) 
                this.id = preventive.id.GetValueOrDefault();

            this.preventiveDate = preventive.lastPreventiveDate;
            this.ticketId = preventive.ticketId;
            this.computerId = preventive.deviceId;
        }
    }
}
