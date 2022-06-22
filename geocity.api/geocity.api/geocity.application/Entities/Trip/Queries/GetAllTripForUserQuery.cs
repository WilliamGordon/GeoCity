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

namespace geocity.application.Entities.Trip.Queries
{

    public class GetAllTripForUserQuery : IRequest<List<TripOverviewDto>>
    {
        public string UserId { get; set; }
    }

    public class GetAllTripForUserQueryHandler : IRequestHandler<GetAllTripForUserQuery, List<TripOverviewDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetAllTripForUserQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TripOverviewDto>> Handle(GetAllTripForUserQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var tripUsers = await _context.TripUsers
                .Include(t => t.Trip)
                .ThenInclude(t => t.City)
                .Where(i => i.UserId == request.UserId)
                .ToListAsync(cancellationToken: cancellationToken);

                var tripOverviewList = new List<TripOverviewDto>();

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
                    tripOverviewList.Add(tripUser.Trip);
                }
                return tripOverviewList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
