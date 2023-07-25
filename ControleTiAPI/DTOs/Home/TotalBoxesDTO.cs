namespace ControleTiAPI.DTOs.Home
{
    public class TotalBoxesDTO
    { 
        public TotalBox ramalBox { get; set; }
        public TotalBox chipBox { get; set; }
        public TotalBox nobreakBox { get; set; }

        public TotalBoxesDTO(TotalBox ramalBox, TotalBox chipBox, TotalBox nobreakBox)
        {
            this.ramalBox = ramalBox;
            this.chipBox = chipBox;
            this.nobreakBox = nobreakBox;
        }
    }    

    public class TotalBox
    {
        public int total { get; set; }
    }
}
