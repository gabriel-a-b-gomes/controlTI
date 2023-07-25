using System.Reflection.Metadata;

namespace ControleTiAPI.DTOs
{
    public class UserAuthenticatedDTO
    {
        public bool isAuthenticated { get; set; }
        public int id { get; set; }
        public string displayName { get; set; } = String.Empty;
        public string userName { get; set; } = String.Empty;
        public string userEmail { get; set; } = String.Empty;
        public string roles { get; set; } = String.Empty;
    }
}
