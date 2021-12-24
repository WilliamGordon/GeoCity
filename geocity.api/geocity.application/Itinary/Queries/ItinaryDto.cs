﻿using geocity.application.ItinaryPlace.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Itinary.Queries
{
    public class ItinaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Distance { get; set; }
        public string Duration { get; set; }
        public ICollection<ItinaryPlaceDto> ItinaryPlaces { get; set; }
    }
}
