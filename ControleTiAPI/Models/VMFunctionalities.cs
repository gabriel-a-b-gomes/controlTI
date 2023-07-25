namespace ControleTiAPI.Models
{
    public class VMFunctionalities
    {
        public int vmId { get; set; }
        public int functionalityId { get; set; }
        public virtual ServerVM virtualMachine { get; set; } = new ServerVM();
        public virtual ServerFunctionality functionality { get; set; } = new ServerFunctionality();
    }
}
