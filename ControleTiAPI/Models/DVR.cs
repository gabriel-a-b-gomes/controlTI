using ControleTiAPI.DTOs;
using ControleTiAPI.Models.Preventives;
using Microsoft.Identity.Client;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.Models
{
    public class DVR
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; } = String.Empty;
        [StringLength(maximumLength: 200)]
        public string location { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string brand { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string? model { get; set; }
        public int qtdeChannels { get; set; }
        public double hdSize { get; set; }
        public int activeCams { get; set; }
        public bool hasBalun { get; set; }
        [StringLength(maximumLength: 100)]
        public string dvrIP { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string dvrPort { get; set; } = String.Empty;
        [StringLength(maximumLength: 75)]
        public string dvrUser { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string dvrPassword { get; set; } = String.Empty;
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

        public virtual ICollection<DVRPreventive> preventives { get; set; }

        public DVR()
        {
            preventives = new HashSet<DVRPreventive>();
        }

        public DVR(DVRCreationDTO dvr)
        {
            if (dvr.id != null)
                this.id = dvr.id.GetValueOrDefault();

            this.code = dvr.code;
            this.location = dvr.location;
            this.brand = dvr.brand;
            this.model = dvr.model;
            this.qtdeChannels = dvr.qtdeChannels;
            this.hdSize = dvr.hdSize;
            this.activeCams = dvr.activeCams;
            this.hasBalun = dvr.hasBalun;
            this.dvrIP = dvr.dvrIP;
            this.dvrPort = dvr.dvrPort;
            this.dvrUser = dvr.dvrUser;
            this.dvrPassword = dvr.dvrPassword;
            this.status = dvr.status;
            this.assetNumber = dvr.assetNumber;
            this.acquisitionDate = dvr.acquisitionDate;
            this.lastPreventive = dvr.lastPreventive;
            this.ticketId = dvr.ticketId;
            this.notes = dvr.notes;
        }
    }
}
