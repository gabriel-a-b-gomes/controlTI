using ControleTiAPI.DTOs.Preventives;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models.Preventives
{
    public class ServerPreventive
    {
        public int id { get; set; }
        public DateTime preventiveDate { get; set; }
        [StringLength(maximumLength: 100)]
        public string ticketId { get; set; }
        public int hostId { get; set; }
        public ServerHost host { get; set; }

        public ServerPreventive()
        {
            this.preventiveDate = new DateTime();
            this.ticketId = String.Empty;
            this.host = new ServerHost();
        }

        public ServerPreventive(int? id, DateTime preventiveDate, string? ticketId, int hostId)
        {
            if (id != null)
                this.id = id.GetValueOrDefault();
            this.preventiveDate = preventiveDate;
            this.ticketId = ticketId != null ? ticketId : "";
            this.hostId = hostId;
        }

        public ServerPreventive(PreventiveCreationDTO preventive)
        {
            if (preventive.id != null)
                this.id = preventive.id.GetValueOrDefault();

            this.preventiveDate = preventive.lastPreventiveDate;
            this.ticketId = preventive.ticketId;
            this.hostId = preventive.deviceId;
        }
    }
}
