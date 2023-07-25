namespace ControleTiAPI.DTOs.Infos
{
    public class InfoChipDTO
    {
        public int countChipActive { get; set; }
        public int countWithoutEmployee { get; set; }
        public int countChipWithCellphone { get; set; }
        public int countChipBoughtLastYear { get; set; }

        public InfoChipDTO(int countChipActive, int countWithoutEmployee, int countChipWithCellphone, int countChipBoughtLastYear)
        {
            this.countChipActive = countChipActive;
            this.countWithoutEmployee = countWithoutEmployee;
            this.countChipWithCellphone = countChipWithCellphone;
            this.countChipBoughtLastYear = countChipBoughtLastYear;
        }
    }
}
