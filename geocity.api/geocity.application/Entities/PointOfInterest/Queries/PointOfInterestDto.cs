using geocity.application.DTOs.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.PointOfInterest.Queries
{
    public class PointOfInterestDto : BaseDto
    {
        public string OsmId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string PriceRange { get; set; } = string.Empty;
        public string DurationRange { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int NbTimeUsed { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public bool IsSuggestion { get; set; }
        public Guid CityId { get; set; }
    }
}
