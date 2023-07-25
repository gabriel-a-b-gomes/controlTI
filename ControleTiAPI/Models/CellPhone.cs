using ControleTiAPI.DTOs;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ControleTiAPI.Models
{
    public class CellPhone
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string model { get; set; } = String.Empty;
        public int memorySize { get; set; }
        public int storageSize { get; set; }
        [StringLength(maximumLength: 100)]
        public string processingUnit { get; set; } = String.Empty;
        [StringLength(maximumLength: 100)]
        public string operationalSystem { get; set; } = String.Empty;

        [ForeignKey("cellphoneId")]
        public virtual ICollection<Chip> chips { get; private set; }

        public CellPhone()
        {
            this.chips = new HashSet<Chip>();
        }

        public CellPhone(CellPhoneCreationDTO cellphone)
        {
            if (cellphone.id != null)
            {
                this.id = cellphone.id.GetValueOrDefault();
            }

            this.model = cellphone.model;
            this.memorySize = cellphone.memorySize;
            this.storageSize = cellphone.storageSize;
            this.processingUnit = cellphone.processingUnit;
            this.operationalSystem = cellphone.operationalSystem;

            this.chips = new HashSet<Chip>();
        }

        public static bool IsClearCellPhone(CellPhoneCreationDTO cellphone)
        {
            return (cellphone.model?.Length == 0 &&
                    cellphone.processingUnit?.Length == 0 &&
                    cellphone.operationalSystem?.Length == 0 &&
                    cellphone.memorySize == 0 &&
                    cellphone.storageSize == 0);
        }
    }
}
