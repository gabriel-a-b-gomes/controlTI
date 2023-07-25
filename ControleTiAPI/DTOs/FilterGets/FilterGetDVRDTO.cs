namespace ControleTiAPI.DTOs.FilterGets
{
    public class FilterGetDVRDTO
    {
        public ICollection<double> hdSizes { get; set; } = new HashSet<double>();
        public ICollection<int> channels { get; set; } = new HashSet<int>();

        public FilterGetDVRDTO(ICollection<double> hdSizes, ICollection<int> channels)
        {
            this.hdSizes = hdSizes;
            this.channels = channels;
        }
    }
}
