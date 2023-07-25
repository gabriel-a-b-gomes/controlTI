namespace ControleTiAPI.DTOs.Filters
{
    public class AccountFilterDTO
    {
        public int statusFilter { get; set; }
        public string employeeUser { get; set; } = String.Empty;
        public string employeeName { get; set; } = String.Empty;
        public string employeeDepartment { get; set; } = String.Empty;
        public string employeeEnterprise { get; set; } = String.Empty;
    }
}
