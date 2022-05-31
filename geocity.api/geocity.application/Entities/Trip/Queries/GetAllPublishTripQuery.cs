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
                var trip = await _context.Trips
                    .Include(t => t.City)
                    .Where(i => i.Name.Contains(request.SearchString) || i.City.Name.Contains(request.SearchString))
                    .ToListAsync(cancellationToken: cancellationToken);

                var tripDto = _mapper.Map<List<TripOverviewDto>>(trip);
                return tripDto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
