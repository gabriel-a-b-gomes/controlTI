using ControleTiAPI.DTOs;
using ControleTiAPI.Models.Preventives;
using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace ControleTiAPI.Models
{
    public class Nobreak
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string location { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string brand { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string model { get; set; } = String.Empty;
        public int qtdeVA { get; set; }
        [NotNull]
        public bool isSenoidal { get; set; } = false;
        public int? typeOfUse { get; set; }
        public int status { get; set; }
        [StringLength(maximumLength: 100)]
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public DateTime? lastPreventive { get; set; }
        [StringLength(maximumLength: 100)]
        public string? ticketId { get; set; }
        public string? notes { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }

        public virtual ICollection<NobreakPreventive> preventives { get; set; }

        public Nobreak()
        {
            preventives = new HashSet<NobreakPreventive>();
        }

        public Nobreak(NobreakCreationDTO nobreak)
        {
            if (nobreak.id != null) 
                this.id = nobreak.id.GetValueOrDefault();
            this.code = nobreak.code;
            this.location = nobreak.location;
            this.brand = nobreak.brand;
            this.model = nobreak.model;
            this.qtdeVA = nobreak.qtdeVA;
            this.isSenoidal = nobreak.isSenoidal;
            this.typeOfUse = nobreak.typeOfUse;
            this.status = nobreak.status;
            this.assetNumber = nobreak.assetNumber;
            this.lastPreventive = nobreak.lastPreventive;
            this.acquisitionDate = nobreak.acquisitionDate;
            this.ticketId = nobreak.ticketId;
            this.notes = nobreak.notes;
        }
    }
}
