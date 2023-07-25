using ControleTiAPI.DTOs;
using System.ComponentModel.DataAnnotations;

namespace ControleTiAPI.Models
{
    public class ProcessingUnit
    {
        public int id { get; set; }
        [StringLength(maximumLength: 150)]
        public string model { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string generation { get; set; } = String.Empty;
        [StringLength(maximumLength: 50)]
        public string frequency { get; set; } = String.Empty;
        public int rankProcessingUnit { get; set; }

        public virtual ICollection<Computer> computers { get; private set; }

        public ProcessingUnit()
        {
            computers = new HashSet<Computer>();
        }

        public ProcessingUnit(ProcessingUnitCreationDTO processor)
        {
            this.model = processor.model;
            this.generation = processor.generation;
            this.frequency = processor.frequency;
            this.rankProcessingUnit = processor.rankProcessingUnit;

            this.computers = new HashSet<Computer>();
        }
    }
}
