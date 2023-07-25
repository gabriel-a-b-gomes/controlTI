namespace ControleTiAPI.DTOs.Preventives
{
    public class PreventiveFilterDTO
    {
        public ICollection<string> searches { get; set; } = new HashSet<string>();
        public PaginationDTO paginate { get; set; } = new PaginationDTO();
    }
}
