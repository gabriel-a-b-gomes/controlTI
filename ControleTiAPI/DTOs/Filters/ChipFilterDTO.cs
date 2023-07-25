using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace ControleTiAPI.DTOs.Filters
{
    public class ChipFilterDTO
    {
        public int statusFilter { get; set; }
        public string typeFilter { get; set; } = String.Empty;
        public string? deepFilterCellphone { get; set; }
        public int toCellphoneMemorySize { get; set; }
        public int toCellphoneStorageSize { get; set; }
        public DateTime? fromAcquisitionDate { get; set; }
        public DateTime? toAcquisitionDate { get; set; }
    }
}
