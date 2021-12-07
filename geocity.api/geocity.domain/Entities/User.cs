using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class User
    {
        public int Id { get; set; } 
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public virtual ICollection<TripUser> TripUsers { get; set; }
    }
}
