namespace ControleTiAPI.DTOs.Filters
{
    public class FilterDTO
    {
        public ICollection<SearchDTO> searches { get; set; } = new HashSet<SearchDTO>();
        public PaginationDTO paginate { get; set; } = new PaginationDTO();
    }

    public class FilterDTO<T>
    {
        public ICollection<SearchDTO> searches { get; set; } = new HashSet<SearchDTO>();
        public T? extra { get; set; }
        public PaginationDTO paginate { get; set; } = new PaginationDTO();
    }

    public class SearchDTO
    {
        public string search { get; set; } = String.Empty;
        public string attributte { get; set; } = String.Empty;
    }
}
