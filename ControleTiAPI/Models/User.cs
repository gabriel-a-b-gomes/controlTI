using ControleTiAPI.DTOs;
using ControleTiAPI.DTOs.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class User
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string displayname { get; set; }
        [StringLength(maximumLength: 100)]
        public string username { get; set; }
        [StringLength(maximumLength: 100)]
        public string email { get; set; }
        public bool userIsActive { get; set; }

        public ICollection<UserClaims> userClaims { get; private set; }

        public User() 
        {
            this.userClaims = new HashSet<UserClaims>();
            this.username = String.Empty;
            this.email = String.Empty;
            this.displayname = String.Empty;
        }

        public User(UserCreationDTO user)
        {
            if (user.id != null)
            {
                this.id = user.id.GetValueOrDefault();
            }

            this.displayname = user.displayname;
            this.username = user.username;
            this.email = user.email;
            this.userIsActive = user.userIsActive == (int)StatusEnum.active ? true : false;

            this.setUserClaims(new HashSet<UserClaims>());
            this.AddClaims(user.claims);
        }

        public void setUserClaims(ICollection<UserClaims> newUserClaim)
        {
            try
            {
                this.userClaims = newUserClaim;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro em setar userClaim - " + ex.Message);
            }
        }

        public void AddClaim(UserClaims claim)
        {
            this.userClaims.Add(claim);
        }

        public void AddClaims(ICollection<Claims> claims)
        {
            var selectedClaims = new HashSet<string>();

            foreach (var claim in claims)
            {
                selectedClaims.Add(claim.value);
            }

            var values = string.Join(',', selectedClaims);
            AddClaim(new UserClaims(this.id, values));
        }
    }
}
