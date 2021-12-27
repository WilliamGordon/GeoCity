using geocity.application.Place.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.ItinaryPlace.Queries
{
    public class ItinaryPlaceDto
    {
        public int Id { get; set; }
        public PlaceDto Place { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? Duration { get; set; }
    }
}
