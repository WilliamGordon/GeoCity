using AutoMapper;
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
    public class GetAllPublishTripQuery : IRequest<List<TripOverviewDto>>
    {
        public string SearchString { get; set; }
    }

    public class GetAllPublishTripQueryHandler : IRequestHandler<GetAllPublishTripQuery, List<TripOverviewDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetAllPublishTripQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TripOverviewDto>> Handle(GetAllPublishTripQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var trips = await _context.Trips
                    .Include(t => t.City)
                    .Where(i => (i.Name.ToUpper().Contains(request.SearchString.ToUpper()) || i.City.Name.ToUpper().Contains(request.SearchString.ToUpper())) && i.IsPublished ==  true)
                    .ToListAsync(cancellationToken: cancellationToken);
                var tripsDto = _mapper.Map<List<TripOverviewDto>>(trips);
                foreach (var trip in tripsDto)
                {
                    var ratings = await _context.TripUserRatings.Where(x => x.TripId == trip.Id).ToListAsync();
                    int rating = 0;
                    if (ratings.Count != 0)
                    {
                        trip.Rating = (int)Math.Round(ratings.Average(x => x.Rating));
                    }

                    var duration = _context.Itinaries.Where(x => x.TripId == trip.Id).Sum(x => x.Duration);
                    var distance = _context.Itinaries.Where(x => x.TripId == trip.Id).Sum(x => x.Distance);
                    var price = _context.ItinaryPointOfInterests.Where(x => x.Itinary.Trip.Id == trip.Id).DefaultIfEmpty().Sum(x => x.Price);
                    duration = duration + _context.ItinaryPointOfInterests.Where(x => x.Itinary.Trip.Id == trip.Id).DefaultIfEmpty().Sum(x => x.Duration);
                    trip.Duration = (int)duration;
                    trip.Distance = (decimal)distance;
                    trip.Price = (decimal)price;
                }
                return tripsDto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
