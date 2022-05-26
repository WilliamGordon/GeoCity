using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUserRating.Queries
{
    public class GetTripUserRatingQuery
    {
        public Guid UserId { get; set; }
    }
}