namespace ControleTiAPI.DTOs.FilterGets
{
    public class FilterGetRamalDTO
    {
        public ICollection<string> exitNumbers { get; set; } = new HashSet<string>();
        public ICollection<string> gateways { get; set; } = new HashSet<string>();

        public FilterGetRamalDTO(ICollection<string> exitNumbers, ICollection<string> gateways)
        {
            this.exitNumbers = exitNumbers;
            this.gateways = gateways;
        }
    }
}
