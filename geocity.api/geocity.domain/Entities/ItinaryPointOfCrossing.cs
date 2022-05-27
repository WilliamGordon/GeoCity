using geocity.domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class ItinaryPointOfCrossing : BaseEntity
    {
        public string? Description { get; set; }
        public Guid ItinaryId { get; set; }
        public Itinary Itinary { get; set; } = new Itinary();
        public Guid PointOfCrossingId { get; set; }
        public PointOfCrossing PointOfCrossing { get; set; }
    }
}
