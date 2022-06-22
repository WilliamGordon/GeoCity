using geocity.domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class TripUserRating : BaseEntity
    {
        public Guid TripId { get; set; }
        public Trip Trip { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int Rating { get; set; }
    }
}
