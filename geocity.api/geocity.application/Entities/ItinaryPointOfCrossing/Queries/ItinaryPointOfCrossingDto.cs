using geocity.application.DTOs.Base;
using geocity.application.Entities.PointOfCrossing.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfCrossing.Queries
{
    public class ItinaryPointOfCrossingDto : BaseDto
    {
        public string? Description { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public Guid CityId { get; set; }
    }
}
