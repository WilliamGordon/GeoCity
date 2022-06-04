using geocity.application.DTOs.Base;
using geocity.application.Entities.PointOfCrossing.Queries;
using geocity.application.User.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfCrossing.Queries
{
    public class ItinaryPointOfCrossingDto : BaseDto
    {
        public string? Description { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string UserCreateId { get; set; }
        public string UserCreateName { get; set; }
        public string UserUpdateId { get; set; }
        public string UserUpdateName { get; set; }
        public Guid CityId { get; set; }
    }
}
