namespace ControleTiAPI.DTOs.FilterGets
{
    public class FilterGetComputerDTO
    {
        public ICollection<ComputerProfile> profiles { get; set; } = new HashSet<ComputerProfile>();

        public FilterGetComputerDTO(ICollection<ComputerProfile> profiles)
        {
            this.profiles = profiles;
        }
    }
}
