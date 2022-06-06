using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUserRating.Queries
{
    public class TripUserRatingDto
    {
        public Guid Id { get; set; }
        public Guid TripId { get; set; }
        public string UserId { get; set; }
        public int Rating { get; set; }
    }
}
