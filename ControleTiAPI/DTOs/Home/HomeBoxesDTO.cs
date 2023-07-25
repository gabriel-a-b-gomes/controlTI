namespace ControleTiAPI.DTOs.Home
{
    public class HomeBoxesDTO
    {
        public HomeBox serverBox { get; set; }
        public HomeBox dvrBox { get; set; }
        public HomeBox switchBox { get; set; }
        public HomeBox printerBox { get; set; }

        public HomeBoxesDTO(HomeBox serverBox, HomeBox dvrBox, HomeBox switchBox, HomeBox printerBox)
        {
            this.serverBox = serverBox;
            this.dvrBox = dvrBox;
            this.switchBox = switchBox;
            this.printerBox = printerBox;
        }
    }
        
    public class HomeBox
    {
        public int countPart { get; set; }
        public int countTotal { get; set; }
    }
}
