using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class TripUser
    {
        public int Id { get; set; }
        public int TripId { get; set; }
        public Trip Trip { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsOwner { get; set; }
        public bool IsParticipant { get; set; }
        public bool IsFavorite { get; set; }
        public decimal Rating { get; set; }
        public string? Comment { get; set; }
    }
}
