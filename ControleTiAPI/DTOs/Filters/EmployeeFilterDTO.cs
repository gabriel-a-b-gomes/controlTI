namespace ControleTiAPI.DTOs.Filters
{
    public class EmployeeFilterDTO
    {
        public int statusFilter { get; set; }
        public string employeeUser { get; set; } = String.Empty;
        public string employeeEmail { get; set; } = String.Empty;
        public string employeeEmailPassword { get; set; } = String.Empty;
        public string employeeAlternative { get; set; } = String.Empty;
        public DateTime? fromIngressDate { get; set; }
        public DateTime? toIngressDate { get; set; }
    }
}
