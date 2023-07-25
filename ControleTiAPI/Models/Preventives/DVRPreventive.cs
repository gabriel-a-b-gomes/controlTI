using ControleTiAPI.DTOs.Preventives;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models.Preventives
{
    public class DVRPreventive
    {
        public int id { get; set; }
        public DateTime preventiveDate { get; set; }
        [StringLength(maximumLength: 100)]
        public string ticketId { get; set; }
        public int dvrId { get; set; }
        public DVR dvr { get; set; }

        public DVRPreventive()
        {
            this.preventiveDate = new DateTime();
            this.ticketId = String.Empty;
            this.dvr = new DVR();
        }

        public DVRPreventive(int? id, DateTime preventiveDate, string? ticketId, int dvrId)
        {
            if (id != null)
                this.id = id.GetValueOrDefault();
            this.preventiveDate = preventiveDate;
            this.ticketId = ticketId != null ? ticketId : "";
            this.dvrId = dvrId;
        }

        public DVRPreventive(PreventiveCreationDTO preventive)
        {
            if (preventive.id != null)
                this.id = preventive.id.GetValueOrDefault();

            this.preventiveDate = preventive.lastPreventiveDate;
            this.ticketId = preventive.ticketId;
            this.dvrId = preventive.deviceId;
        }
    }
}
