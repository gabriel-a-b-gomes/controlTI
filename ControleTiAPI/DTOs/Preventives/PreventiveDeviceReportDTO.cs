namespace ControleTiAPI.DTOs.Preventives
{
    public class PreventiveDeviceReportDTO
    {
        public ICollection<PreventiveDTO> preventives { get; set; } = new HashSet<PreventiveDTO>();
        public int total { get; set; }
        public int doneQtde { get; set; }
        public int overdueQtde { get; set; }
        public int todoQtde { get; set; }
        public DateTime? forecastFinish { get; set; }

        public PreventiveDeviceReportDTO() { }

        public PreventiveDeviceReportDTO(ICollection<PreventiveDTO> preventives, int total, int doneQtde, int overdueQtde, int todoQtde, DateTime? forecastFinish)
        {
            this.preventives = preventives;
            this.total = total;
            this.doneQtde = doneQtde;
            this.overdueQtde = overdueQtde;
            this.todoQtde = todoQtde;
            this.forecastFinish = forecastFinish;
        }
    }
}
