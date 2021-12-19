using geocity.application.Cities.Queries;
using geocity.application.Itinary.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Trip.Queries
{
    public class TripDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int NbDays { get; set; }
        public bool IsPublished { get; set; }
        public CityDto City { get; set; }
        public ICollection<ItinaryDto> Itinaries { get; set; }

    }
}
