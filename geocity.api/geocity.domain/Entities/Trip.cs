using geocity.domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class Trip : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public int Days { get; set; }
        public string? Description { get; set; }
        public bool IsPublished { get; set; }
        public Guid Link { get; set; }
        public Guid CityId { get; set; }
        public City City { get; set; } = new City();
        public ICollection<Itinary> Itinaries { get; set; }
        public ICollection<TripUser> TripUsers { get; set; }
        public ICollection<TripUserFavorite> TripUserFavorites { get; set; }
        public ICollection<TripUserRating> TripUserRatings { get; set; }
    }
}
