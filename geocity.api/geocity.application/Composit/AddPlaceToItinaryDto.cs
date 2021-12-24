using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Composit
{
    public class AddPlaceToItinaryDto
    {
        public int ItinaryId { get; set; }
        public string? Name { get; set; }
        public decimal latitude { get; set; }
        public decimal Longitude { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? Duration { get; set; }
    }
}
