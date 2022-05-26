using geocity.application.DTOs.Base;
using geocity.application.Trip.Queries;
using geocity.application.User.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.TripUser.Queries
{
    public class TripUserDto : BaseDto
    {
        public Guid TripId { get; set; }
        public Guid UserId { get; set; }
        public bool IsOwner { get; set; }
    }
}
