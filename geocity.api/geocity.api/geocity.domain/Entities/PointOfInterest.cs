using geocity.domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class PointOfInterest : BaseEntity
    {
        public string OsmId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Address { get; set; }
        public bool IsSuggestion { get; set; }
        public Guid CityId { get; set; }

        public City City { get; set; }
    }
}
