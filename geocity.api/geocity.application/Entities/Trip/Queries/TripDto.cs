using geocity.application.User.Queries;
using geocity.application.DTOs.Base;
using geocity.application.Itinary.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using geocity.application.TripUser.Queries;
using geocity.application.Entities.TripUserFavorite.Queries;
using geocity.application.Entities.TripUserRating.Queries;
using geocity.application.City.Queries;

namespace geocity.application.Trip.Queries
{
    public class TripDto : BaseDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Days { get; set; }
        public bool IsPublished { get; set; }
        public Guid Link { get; set; }
        public Guid CityId { get; set; }
        public CityDto City { get; set; }
        public ICollection<ItinaryDto> Itinaries { get; set; }
        public ICollection<TripUserDto> TripUsers { get; set; }
        public ICollection<TripUserFavoriteDto> TripUserFavorites { get; set; }
        public ICollection<TripUserRatingDto> TripUserRatings { get; set; }
    }
}
