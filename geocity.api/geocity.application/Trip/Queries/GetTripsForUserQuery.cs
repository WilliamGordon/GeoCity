using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Trip.Queries
{
    public class GetTripsForUserQuery : IRequest<List<TripDto>>
    {
        public string UserId { get; set; }
    }
}
