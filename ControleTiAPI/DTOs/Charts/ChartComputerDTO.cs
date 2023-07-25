namespace ControleTiAPI.DTOs.Charts
{
    public class ChartComputerDTO
    {
        public ChartComputer memory { get; set; } = new ChartComputer();
        public ChartComputer type { get; set; } = new ChartComputer();
        public ChartComputer storageSize { get; set; } = new ChartComputer();
        public ChartComputer SO { get; set; } = new ChartComputer();
        public ChartComputer processor { get; set; } = new ChartComputer();

        public ChartComputerDTO()
        {
            memory = new ChartComputer();
            type = new ChartComputer();
            storageSize = new ChartComputer();
            SO = new ChartComputer();
            processor = new ChartComputer();
        }

        public ChartComputerDTO(ChartComputer memory, ChartComputer type, ChartComputer storageSize, ChartComputer SO, ChartComputer processor)
        {
            this.memory = memory;
            this.type = type;
            this.storageSize = storageSize;
            this.SO = SO;
            this.processor = processor;
        }
    }
}
