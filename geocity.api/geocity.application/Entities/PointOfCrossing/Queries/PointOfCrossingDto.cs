using geocity.application.DTOs.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.PointOfCrossing.Queries
{
    public class PointOfCrossingDto : BaseDto
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public Guid CityId { get; set; }
    }
}
