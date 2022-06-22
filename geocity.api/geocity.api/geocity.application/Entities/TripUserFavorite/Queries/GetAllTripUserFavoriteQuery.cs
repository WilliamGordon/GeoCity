using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUserFavorite.Queries
{
    
    public class GetAllTripUserFavoriteQuery : IRequest<List<TripUserFavoriteDto>>
    {
        public string UserId { get; set; }
    }
    public class GetAllTripUserFavoriteQueryHandler : IRequestHandler<GetAllTripUserFavoriteQuery, List<TripUserFavoriteDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;
    
        public GetAllTripUserFavoriteQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    
        public async Task<List<TripUserFavoriteDto>> Handle(GetAllTripUserFavoriteQuery request, CancellationToken cancellationToken)
        {
            var tripUsers = await _context.TripUserFavorites
                .Include(t => t.Trip)
                .ThenInclude(t => t.City)
                .Where(i => i.UserId == request.UserId)
                .ToListAsync(cancellationToken: cancellationToken);
    
            var tripUserDto = _mapper.Map<List<TripUserFavoriteDto>>(tripUsers);
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
