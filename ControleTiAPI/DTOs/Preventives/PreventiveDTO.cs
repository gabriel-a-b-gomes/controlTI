using ControleTiAPI.DTOs.Enums;

namespace ControleTiAPI.DTOs.Preventives
{
    public class PreventiveDTO
    {
        public DateTime? dueDate { get; set; } = new DateTime();
        public DateTime? lastPreventiveDate { get; set; } = new DateTime();
        public string ticketId { get; set; } = String.Empty;
        public int deviceId { get; set; }
        public string deviceCode { get; set; } = String.Empty;
        public int statusPreventive { get; set; }

        // Computer Preventives Only
        public string? employee { get; set; }
        public string? department { get; set; }
        public string? enterprise { get; set; }

        public static DateTime setDueDate(DateTime? lastPreventive, DateTime createdAt)
        {
            DateTime due = new DateTime();
            try
            {
                if (lastPreventive == null)
                    due = createdAt;
                else
                    due = lastPreventive.GetValueOrDefault();

                int addDays = 450;

                due = due.AddDays(addDays);

                return due;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro em setar o prazo > " + ex.Message);
            }
        }

        public static int setStatusPreventive(DateTime? lastPreventive, DateTime createdAt)
        {
            try
            {
                DateTime now = DateTime.Now;

                DateTime yearAgo = new DateTime(now.Year - 1, now.Month, now.Day);

                if (lastPreventive != null && lastPreventive > yearAgo)
                    return (int)StatusPreventiveEnum.done;
                
                var dueDate = setDueDate(lastPreventive, createdAt);

                if (now > dueDate)
                    return (int)StatusPreventiveEnum.overdue;
                
                return (int)StatusPreventiveEnum.todo;
                
            }
            catch (Exception ex)
            {
                throw new Exception("Erro em setar status da preventiva > " + ex.Message);
            }
        }
    }
}
