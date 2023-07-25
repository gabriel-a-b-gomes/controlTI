namespace ControleTiAPI.DTOs.FilterGets
{
    public class FilterGetChipDTO
    {
        public ICollection<string> types { get; set; } = new HashSet<string>();
        public ICollection<int> cellphoneMemorySizes { get; set; } = new HashSet<int>();
        public ICollection<int> cellphoneStorageSizes { get; set; } = new HashSet<int>();

        public FilterGetChipDTO(ICollection<string> types, ICollection<int> cellphoneMemorySizes, ICollection<int> cellphoneStorageSizes)
        {
            this.types = types;
            this.cellphoneMemorySizes = cellphoneMemorySizes;
            this.cellphoneStorageSizes = cellphoneStorageSizes;
        }
    }
}
