using AutoMapper;
using geocity.application.TripUser.Queries;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUser.Queries
{
    public class GetAllTripUserQuery : IRequest<List<TripUserDto>>
    {
        public string UserId { get; set; }
    }
    public class GetAllTripUserQueryHandler : IRequestHandler<GetAllTripUserQuery, List<TripUserDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetAllTripUserQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TripUserDto>> Handle(GetAllTripUserQuery request, CancellationToken cancellationToken)
        {
            var tripUsers = await _context.TripUsers
                .Include(t => t.Trip)
                .ThenInclude(t => t.City)
                .Where(i => i.UserId == request.UserId)
                .ToListAsync(cancellationToken: cancellationToken);

            var tripUserDto = _mapper.Map<List<TripUserDto>>(tripUsers);
            foreach (var tripUser in tripUserDto)
            {
                var ratings = await _context.TripUserRatings.Where(x => x.TripId == tripUser.Trip.Id).ToListAsync();
                int rating = 0;
                if (ratings.Count != 0)
                {
                    tripUser.Trip.Rating = (int)Math.Round(ratings.Average(x => x.Rating));
                }

                var duration = _context.Itinaries.Where(x => x.TripId == tripUser.Trip.Id).Sum(x => x.Duration);
                var distance = _context.Itinaries.Where(x => x.TripId == tripUser.Trip.Id).Sum(x => x.Distance);
                var price = _context.ItinaryPointOfInterests.Where(x => x.Itinary.Trip.Id == tripUser.Trip.Id).DefaultIfEmpty().Sum(x => x.Price);
                duration = duration + _context.ItinaryPointOfInterests.Where(x => x.Itinary.Trip.Id == tripUser.Trip.Id).DefaultIfEmpty().Sum(x => x.Duration);
                tripUser.Trip.Duration = (int)duration;
                tripUser.Trip.Distance = (decimal)distance;
                tripUser.Trip.Price = (decimal)price;
            }

            return tripUserDto;
        }
    }
}
