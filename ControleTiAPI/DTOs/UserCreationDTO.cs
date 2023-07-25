using ControleTiAPI.DTOs.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.DTOs
{
    public class UserCreationDTO
    {
        public int? id { get; set; }
        public string displayname { get; set; } = string.Empty;
        public string username { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public int userIsActive { get; set; } = (int)StatusEnum.active;
        
        public ICollection<Claims> claims { get; set; } = new HashSet<Claims>();
    }

    public class Claims
    {
        public string value { get; set; } = String.Empty;
    }
}
