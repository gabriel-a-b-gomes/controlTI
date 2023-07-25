using System.Net.NetworkInformation;

namespace ControleTiAPI.DTOs
{
    public class PingDTO
    {
        public long roundTripTime { get; set; }
        public int status { get; set; }
        public string address { get; set; } = String.Empty;
        public string code { get; set; } = String.Empty;
        public int deviceId { get; set; }
        public int deviceCategory { get; set; }

        public string? employee { get; set; }
        public string? department { get; set; }
        public string? enterprise { get; set; }
    }
}
