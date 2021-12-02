using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.domain.Entities
{
    public class Coordinate
    {
        public int Id { get; set; }
        public decimal lat { get; set; }
        public decimal lng { get; set; }
    }
}
