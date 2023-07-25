namespace ControleTiAPI.DTOs.Charts
{
    public class ChartComputer
    {
        public string name { get; set; } = String.Empty;
        public string desc { get; set; } = String.Empty;
        public int qtde { get; set; }
        public List<string> computers { get; set; } = new List<string>();
    
        public ChartComputer()
        {
            name = String.Empty;
            desc = String.Empty;
            qtde = 0;
            computers = new List<string>();
        }

        public ChartComputer(string name, string desc, int qtde, List<string> computers)
        {
            this.name = name;
            this.desc = desc;
            this.qtde = qtde;
            this.computers = computers;
        }
    }
}
