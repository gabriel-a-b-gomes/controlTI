namespace ControleTiAPI.DTOs.FormGets
{
    public class FormGetRamalDTO
    {
        public List<Department> departments { get; set; }
        public List<Employee> employees { get; set; }

        public FormGetRamalDTO(List<Department> departments, List<Employee> employees)
        {
            this.departments = departments;
            this.employees = employees;
        }
    }
}
