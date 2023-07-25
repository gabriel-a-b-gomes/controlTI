using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class VpnCreationDTO
    {
        public int? id { get; set; }
        public string vpnUser { get; set; } = String.Empty;
        public string vpnPassword { get; set; } = String.Empty;
    }
}
