namespace ControleTiAPI.DTOs.FormGets
{
    public class FormGetChipDTO
    {
        public List<Department> departments { get; set; }
        public List<Employee> employees { get; set; }
        public List<CellPhone> cellPhones { get; set; }

        public FormGetChipDTO(List<Department> departments, List<Employee> employees, List<CellPhone> cellPhones)
        {
            this.departments = departments;
            this.employees = employees;
            this.cellPhones = cellPhones;
        }
    }
}
