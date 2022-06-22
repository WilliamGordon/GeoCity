using geocity.application.City.Queries;
using geocity.application.DTOs.Base;
using geocity.application.TripUser.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.Trip.Queries
{
    public class TripOverviewDto : BaseDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Days { get; set; }
        public decimal Price { get; set; }
        public decimal Duration { get; set; }
        public decimal Distance { get; set; }
        public int Rating { get; set; }
        public bool IsPublished { get; set; }
        public Guid Link { get; set; }
        public Guid CityId { get; set; }
        public CityDto City { get; set; }
        public ICollection<TripUserDto> TripUsers { get; set; }
    }
}
