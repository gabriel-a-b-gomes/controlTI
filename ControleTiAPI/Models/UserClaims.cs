namespace ControleTiAPI.Models
{
    public class UserClaims
    {
        public int id { get; set; }
        public string claimType { get; set; }
        public string claimValue { get; set; }

        public int userId { get; set; }

        public User user { get; set; }

        public UserClaims()
        {
            this.claimType = String.Empty;
            this.claimValue = String.Empty;
            this.user = new User();
        }
        
        public UserClaims(int userId, string claimValue)
        {
            this.userId = userId;
            this.claimType = "ROLE";
            this.claimValue = claimValue;
        }
    }
}
