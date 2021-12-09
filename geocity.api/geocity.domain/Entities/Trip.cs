using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class Trip
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int NbDays { get; set; }
        public bool IsPublished { get; set; }
        public City City { get; set; }
        public ICollection<TripUser> TripUsers { get; set; }
        public ICollection<Itinary> Itinaries { get; set; }
    }
}
