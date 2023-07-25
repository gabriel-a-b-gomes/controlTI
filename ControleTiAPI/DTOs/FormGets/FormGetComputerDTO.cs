namespace ControleTiAPI.DTOs.FormGets
{
    public class FormGetComputerDTO
    {
        public List<Department> departments { get; set; }
        public List<Employee> employees { get; set; }
        public List<ComputerProfile> profiles { get; set; }
        public List<ProcessingUnit> processingUnits { get; set; }
        public List<Storage> storages { get; set; }

        public FormGetComputerDTO(List<Department> departments, List<Employee> employees, List<ComputerProfile> profiles, List<ProcessingUnit> processingUnits, List<Storage> storages)
        {
            this.departments = departments;
            this.employees = employees;
            this.profiles = profiles;
            this.processingUnits = processingUnits;
            this.storages = storages;
        }
    }
}
