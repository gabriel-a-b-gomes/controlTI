namespace ControleTiAPI.DTOs.Infos
{
    public class InfoComputerDTO
    {
        public int countComputer { get; set; } = 0;
        public int countNotebook { get; set; } = 0;
        public int countPreventives { get; set; } = 0;
        public int countIsNotGood { get; set; } = 0;

        public InfoComputerDTO(int countComputer, int countNotebook, int countPreventives, int countIsNotGood)
        {
            this.countComputer = countComputer;
            this.countNotebook = countNotebook;
            this.countPreventives = countPreventives;
            this.countIsNotGood = countIsNotGood;
        }
    }
}
