namespace ControleTiAPI.Models
{
    public class ComputersReport
    {
        public int id { get; set; }
        public int countComputerIsGood { get; set; }
        public int countComputerIsNotGood { get; set; }
        public DateTime reportDate { get; set; }

        public ComputersReport()
        {
            countComputerIsGood = 0;
            countComputerIsNotGood = 0;
            reportDate = new DateTime();
        }

        public ComputersReport(int countComputerIsGood, int countComputerIsNotGood, DateTime reportDate)
        {
            this.countComputerIsGood = countComputerIsGood;
            this.countComputerIsNotGood = countComputerIsNotGood;
            this.reportDate = reportDate;
        }
    }
}
