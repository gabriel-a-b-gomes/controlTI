namespace ControleTiAPI.Models
{
    public class HostFuncionalities
    {
        public int hostId { get; set; }
        public int functionalityId { get; set; }
        public virtual ServerHost host { get; set; } = new ServerHost();
        public virtual ServerFunctionality functionality { get; set; } = new ServerFunctionality();
    }
}
