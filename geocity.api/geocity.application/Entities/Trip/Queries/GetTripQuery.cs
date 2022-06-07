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
    public class GetTripQuery : IRequest<TripDto>
    {
        public Guid Id { get; set; }
    }

    public class GetTripQueryHandler : IRequestHandler<GetTripQuery, TripDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetTripQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TripDto> Handle(GetTripQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var trip = await _context.Trips
                .Include(t => t.Itinaries)
                .ThenInclude(t => t.ItinaryPointOfCrossing)
                .ThenInclude(t => t.PointOfCrossing)
                .Include(t => t.Itinaries)
                .ThenInclude(t => t.ItinaryPointOfInterest)
                .ThenInclude(t => t.PointOfInterest)
                .Include(t => t.City)
                .Include(t => t.TripUsers)
                .ThenInclude(t => t.User)
                .SingleOrDefaultAsync(x => x.Id == request.Id);
                
                var ratings = await _context.TripUserRatings.Where(x => x.TripId == request.Id).ToListAsync();
                int rating = 0;
                if (ratings.Count != 0)
                {
                    rating = (int)Math.Round(ratings.Average(x => x.Rating));
                }

                var tripDto = _mapper.Map<TripDto>(trip);
                tripDto.Rating = rating;
                return tripDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }
    }
}
