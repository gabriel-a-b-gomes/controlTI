namespace ControleTiAPI.DTOs.Infos
{
    public class InfoNetDevicesDTO
    {
        public int countRouters { get; set; }
        public int countSwitches { get; set; }
        public int countSwitchFull { get; set; }
        public int countSwitchesPorts { get; set; }
        public int countFreeSwitchesPorts { get; set; }
        public int countNetNodes { get; set; }

        public InfoNetDevicesDTO(int countRouters, int countSwitches, int countSwitchFull, int countFreeSwitchesPorts, int countNetNodes, int countSwitchesPorts)
        {
            this.countRouters = countRouters;
            this.countSwitches = countSwitches;
            this.countSwitchFull = countSwitchFull;
            this.countFreeSwitchesPorts = countFreeSwitchesPorts;
            this.countNetNodes = countNetNodes;
            this.countSwitchesPorts = countSwitchesPorts;
        }
    }
}
