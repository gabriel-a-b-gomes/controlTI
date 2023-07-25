using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class SkypeCreatingDTO
    {
        public int? id { get; set; }
        public string skypeUser { get; set; } = String.Empty;
        public string skypePassword { get; set; } = String.Empty;
    }
}
