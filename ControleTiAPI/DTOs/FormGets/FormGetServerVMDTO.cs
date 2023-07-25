namespace ControleTiAPI.DTOs.FormGets
{
    public class FormGetServerVMDTO
    {
        public ICollection<ServerFunctionality> functionalities { get; set; }
        public ICollection<ServerHost> hosts { get; set; }

        public FormGetServerVMDTO(ICollection<ServerFunctionality> functionalities, ICollection<ServerHost> hosts)
        {
            this.hosts = hosts;
            this.functionalities = functionalities;
        }
    }
}
