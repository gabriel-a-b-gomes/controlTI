namespace ControleTiAPI.DTOs.Infos
{
    public class InfoServerDTO
    {
        public int hostQtde { get; set; }
        public int vmQtde { get; set; }
        public int preventivesTodo { get; set; }
        public int vmsSetupThisYear { get; set; }
        
        public InfoServerDTO(int hostQtde, int vmQtde, int preventivesTodo, int vmsSetupThisYear)
        {
            this.hostQtde = hostQtde;
            this.vmQtde = vmQtde;
            this.preventivesTodo = preventivesTodo;
            this.vmsSetupThisYear = vmsSetupThisYear;
        }
    }
}
