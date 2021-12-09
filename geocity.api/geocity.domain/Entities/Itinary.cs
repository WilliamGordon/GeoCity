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
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Distance { get; set; }
        public string? Duration { get; set; }
        public int Day { get; set; }
        public Trip Trip { get; set; }
        public virtual ICollection<ItinaryPlace> ItinaryPlaces { get; set; }
    }
}
