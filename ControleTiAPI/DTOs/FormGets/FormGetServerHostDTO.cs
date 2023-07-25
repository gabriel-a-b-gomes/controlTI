namespace ControleTiAPI.DTOs.FormGets
{
    public class FormGetServerHostDTO
    {
        public ICollection<ServerFunctionality> functionalities { get; set; } = new HashSet<ServerFunctionality>();

        public FormGetServerHostDTO(ICollection<ServerFunctionality> functionalities)
        {
            this.functionalities = functionalities;
        }
    }
}
