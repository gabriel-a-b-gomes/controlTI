namespace ControleTiAPI.DTOs.Preventives
{
    public class PreventiveReportDTO
    {
        public PreventiveDeviceReportDTO computersPreventives { get; set; } = new PreventiveDeviceReportDTO();
        public PreventiveDeviceReportDTO dvrPreventives { get; set; } = new PreventiveDeviceReportDTO();
        public PreventiveDeviceReportDTO nobreakPreventives { get; set; } = new PreventiveDeviceReportDTO();
        public PreventiveDeviceReportDTO serverPreventives { get; set; } = new PreventiveDeviceReportDTO();

        public PreventiveReportDTO(PreventiveDeviceReportDTO computersPreventives, PreventiveDeviceReportDTO dvrPreventives, PreventiveDeviceReportDTO nobreakPreventives, PreventiveDeviceReportDTO serverPreventives)
        {
            this.computersPreventives = computersPreventives;
            this.dvrPreventives = dvrPreventives;
            this.nobreakPreventives = nobreakPreventives;
            this.serverPreventives = serverPreventives;
        }
    }
}
