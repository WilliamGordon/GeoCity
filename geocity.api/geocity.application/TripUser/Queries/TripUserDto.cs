using geocity.application.Trip.Queries;
using geocity.application.User.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.TripUser.Queries
{
    public class TripUserDto
    {
        public int Id { get; set; }
        public TripDto Trip { get; set; }
        public bool IsOwner { get; set; }
        public bool IsParticipant { get; set; }
        public bool IsFavorite { get; set; }
        public decimal Rating { get; set; }
        public string? Comment { get; set; }
    }
}
