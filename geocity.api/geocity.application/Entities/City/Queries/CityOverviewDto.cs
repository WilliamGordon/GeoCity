using geocity.application.DTOs.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.City.Queries
{
    public class CityOverviewDto : BaseDto
    {
        public string Name { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public int NbTrips{ get; set; }
        public int NbPointOfInterests { get; set; }
    }
}
