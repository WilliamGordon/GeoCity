using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class Place
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public virtual ICollection<ItinaryPlace> ItinaryPlaces { get; set; }
    }
}
