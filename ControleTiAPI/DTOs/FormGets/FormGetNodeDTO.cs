namespace ControleTiAPI.DTOs.FormGets
{
    public class FormGetNodeDTO
    {
        public List<Employee> employees { get; set; }
        public List<Switches> switches { get; set; }

        public FormGetNodeDTO(List<Employee> employees, List<Switches> switches)
        {
            this.employees = employees;
            this.switches = switches;
        }
    }
}
