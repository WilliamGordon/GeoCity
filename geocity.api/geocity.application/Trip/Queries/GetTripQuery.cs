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
        public int Id { get; set; }
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
            var trip = await _context.Trips.Include(t => t.Itinaries).Include(t => t.City).SingleOrDefaultAsync(x => x.Id == request.Id);
            var tripDto = _mapper.Map<TripDto>(trip);
            return tripDto;
        }
    }
}
