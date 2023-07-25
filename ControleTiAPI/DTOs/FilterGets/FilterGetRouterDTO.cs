namespace ControleTiAPI.DTOs.FilterGets
{
    public class FilterGetRouterDTO
    {
        public ICollection<string> routerSSIDs { get; set; } = new HashSet<string>();

        public FilterGetRouterDTO(ICollection<string> routerSSIDs)
        {
            this.routerSSIDs = routerSSIDs;
        }
    }
}
