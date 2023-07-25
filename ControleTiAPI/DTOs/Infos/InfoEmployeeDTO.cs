namespace ControleTiAPI.DTOs.Infos
{
    public class InfoEmployeeDTO
    {
        public int countEmployeeActive { get; set; }
        public int countSkypeAccountActive { get; set; }
        public int countVpnAccountActive { get; set; }

        public InfoEmployeeDTO(int countEmployeeActive, int countSkypeAccountActive, int countVpnAccountActive)
        {
            this.countEmployeeActive = countEmployeeActive;
            this.countSkypeAccountActive = countSkypeAccountActive;
            this.countVpnAccountActive = countVpnAccountActive;
        }
    }
}
