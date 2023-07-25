namespace ControleTiAPI.DTOs.Infos
{
    public class InfoDVRDTO
    {
        public int countDVR { get; set; }
        public int countDVRFull { get; set; }
        public int countChannels { get; set; }
        public int countFreeChannels { get; set; }
        public int countCams { get; set; }

        public InfoDVRDTO(int countDVR, int countDVRFull, int countChannels, int countFreeChannels, int countCams)
        {
            this.countDVR = countDVR;
            this.countDVRFull = countDVRFull;
            this.countChannels = countChannels;
            this.countFreeChannels = countFreeChannels;
            this.countCams = countCams;
        }
    }
}
