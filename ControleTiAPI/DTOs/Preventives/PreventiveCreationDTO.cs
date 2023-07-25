namespace ControleTiAPI.DTOs.Preventives
{
    public class PreventiveCreationDTO
    {
        public int? id { get; set; }
        public DateTime lastPreventiveDate { get; set; }
        public string ticketId { get; set; } = String.Empty;
        public int deviceId { get; set; }
    }
}
