using geocity.domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class ItinaryPointOfInterest : BaseEntity
    {
        public string? Description { get; set; }
        public int? Duration { get; set; }
        public decimal? Price { get; set; }
        public Guid ItinaryId { get; set; }
        public Itinary Itinary { get; set; } = new Itinary();
        public Guid PointOfInterestId { get; set; }
        public PointOfInterest PointOfInterest { get; set; }
    }
}
