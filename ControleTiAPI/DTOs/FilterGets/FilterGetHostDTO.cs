namespace ControleTiAPI.DTOs.FilterGets
{
    public class FilterGetHostDTO
    {
        public ICollection<ServerFunctionality> functionalities { get; set; } = new HashSet<ServerFunctionality>();

        public FilterGetHostDTO(ICollection<ServerFunctionality> functionalities)
        {
            this.functionalities = functionalities;
        }
    }
}
