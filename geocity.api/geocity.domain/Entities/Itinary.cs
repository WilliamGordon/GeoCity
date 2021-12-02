using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class Itinary
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CityName { get; set; }
        public decimal CityLat { get; set; }
        public decimal CityLng { get; set; }
        public bool IsPublished { get; set; }
        public virtual ICollection<ItinaryUser> ItinaryUsers { get; set; }
        public virtual ICollection<ItinaryPlace> ItinaryPlaces { get; set; }
    }
}
