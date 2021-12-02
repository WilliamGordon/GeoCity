using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class ItinaryPlace
    {
        public int Id { get; set; }
        public int ItinaryId { get; set; }
        public Itinary Itinary { get; set; }
        public int PlaceId { get; set; }
        public Place Place { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal Duration { get; set; }

    }
}
