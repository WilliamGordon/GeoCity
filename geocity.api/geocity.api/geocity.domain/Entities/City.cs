using geocity.domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class City : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public ICollection<Trip>? Trips { get; set; }
        public ICollection<PointOfInterest>? PointOfInterest { get; set; }
        public ICollection<PointOfCrossing>? PointOfCrossing { get; set; }
    }
}
