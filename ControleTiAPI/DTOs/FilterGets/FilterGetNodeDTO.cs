namespace ControleTiAPI.DTOs.FilterGets
{
    public class FilterGetNodeDTO
    {
        public ICollection<SwitchGet> switches { get; set; } = new HashSet<SwitchGet>();
        public ICollection<string?> patchpanels { get; set; } = new HashSet<string?>();

        public FilterGetNodeDTO(ICollection<SwitchGet> switches, ICollection<string?> patchpanels)
        {
            this.switches = switches;
            this.patchpanels = patchpanels;
        }
    }

    public class SwitchGet
    {
        public int id { get; set; }
        public string code { get; set; } = String.Empty;
    }
}
