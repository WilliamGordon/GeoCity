using geocity.application.DTOs.Base;
using geocity.application.Entities.PointOfInterest.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfInterest.Queries
{
    public class ItinaryPointOfInterestDto : BaseDto
    {
        public Guid ItinryId { get; set; }
        public Guid PointOfInterestId { get; set; }
        public decimal? Price { get; set; }
        public int? Duration { get; set; }
        public string? Description { get; set; }
        public ICollection<PointOfInterestDto> PointOfInterest { get; set; }
    }
}
