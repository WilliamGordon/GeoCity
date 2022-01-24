using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Composit
{
    public class CreateTripDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int NbDays { get; set; }
        public string CityName { get; set; }
        public decimal CityLatitude { get; set; }
        public decimal CityLongitude { get; set; }
        public string UserId { get; set; }
    }
}
