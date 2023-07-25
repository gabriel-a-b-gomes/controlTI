namespace ControleTiAPI.DTOs.Home
{
    public class PreventiveIndicatorDTO
    {
        public string departmentDescription { get; set; } = String.Empty;
        public string departmentEnterprise { get; set; } = String.Empty;
        public int totalPreventivesDone { get; set; }
        public int totalPreventives { get; set; }
    }
}
