using geocity.domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class Itinary : BaseEntity
    {
        public int Day { get; set; }
        public int? Duration { get; set; }
        public decimal? Distance { get; set; }
        public string? Geodata { get; set; }
        public Guid TripId { get; set; }
        public Trip Trip { get; set; } =  new Trip();
        public virtual ICollection<ItinaryPointOfInterest> ItinaryPointOfInterest { get; set; }
        public virtual ICollection<PointOfCrossing> PointOfCrossing { get; set; }
    }
}
