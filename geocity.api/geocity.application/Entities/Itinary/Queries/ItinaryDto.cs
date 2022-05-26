using geocity.application.DTOs.Base;
using geocity.application.Entities.ItinaryPointOfInterest.Queries;
using geocity.application.Entities.PointOfCrossing.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Itinary.Queries
{
    public class ItinaryDto : BaseDto
    {
        public int Day { get; set; }
        public int? Duration { get; set; }
        public decimal? Distance { get; set; }
        public string? Geodata { get; set; }
        public Guid TripId { get; set; }
        public ICollection<ItinaryPointOfInterestDto> ItinaryPointOfInterest { get; set; }
        public ICollection<PointOfCrossingDto> PointOfCrossing { get; set; }
    }
}
