using geocity.application.DTOs.Base;
using geocity.application.Entities.PointOfInterest.Queries;
using geocity.application.User.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfInterest.Queries
{
    public class ItinaryPointOfInterestDto : BaseDto
    {
        
        public decimal? Price { get; set; }
        public int? Duration { get; set; }
        public string? Description { get; set; }
        public string OsmId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public bool IsSuggestion { get; set; }
        public int Position { get; set; }
        public string UserCreateId { get; set; }
        public string UserCreateName { get; set; }
        public string UserUpdateId { get; set; }
        public string UserUpdateName { get; set; }
        public Guid CityId { get; set; }
    }
}
