using geocity.domain.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace geocity.domain.Entities
{
    public class TripUser : BaseEntity
    {
        public Guid TripId { get; set; }
        public Trip Trip { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public bool IsOwner { get; set; }
    }
}
