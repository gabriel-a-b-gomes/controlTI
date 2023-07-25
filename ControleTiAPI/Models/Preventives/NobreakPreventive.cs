using ControleTiAPI.DTOs.Preventives;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models.Preventives
{
    public class NobreakPreventive
    {
        public int id { get; set; }
        public DateTime preventiveDate { get; set; }
        [StringLength(maximumLength: 100)]
        public string ticketId { get; set; }
        public int nobreakId { get; set; }
        public Nobreak nobreak { get; set; }

        public NobreakPreventive()
        {
            this.preventiveDate = new DateTime();
            this.ticketId = String.Empty;
            this.nobreak = new Nobreak();
        }

        public NobreakPreventive(int? id, DateTime preventiveDate, string? ticketId, int nobreakId)
        {
            if (id != null)
                this.id = id.GetValueOrDefault();
            this.preventiveDate = preventiveDate;
            this.ticketId = ticketId != null ? ticketId : "";
            this.nobreakId = nobreakId;
        }

        public NobreakPreventive(PreventiveCreationDTO preventive)
        {
            if (preventive.id != null)
                this.id = preventive.id.GetValueOrDefault();

            this.preventiveDate = preventive.lastPreventiveDate;
            this.ticketId = preventive.ticketId;
            this.nobreakId = preventive.deviceId;
        }
    }
}
