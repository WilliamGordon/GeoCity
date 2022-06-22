using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.DTOs.Composite
{
    public class ItinaryPointOfCrossingFlatDto
    {
        public Guid id { get; set; }
        public string? Description { get; set; }
        public Guid PointOfCrossingId { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public Guid CityId { get; set; }
    }
}
