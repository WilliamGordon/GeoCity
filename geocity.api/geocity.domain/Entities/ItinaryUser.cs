using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class ItinaryUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ItinaryId { get; set; }
        public Itinary Itinary { get; set; }
        public bool IsOwner { get; set; }
        public bool IsParticipant { get; set; }
        public bool IsFavorite { get; set; }
        public decimal Rating { get; set; }
    }
}
