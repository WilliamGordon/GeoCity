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
    public class GetTripUserQuery : IRequest<List<TripUserDto>>
    {
        public string UserId { get; set; }
    }
    public class GetTripUserQueryHandler : IRequestHandler<GetTripUserQuery, List<TripUserDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetTripUserQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TripUserDto>> Handle(GetTripUserQuery request, CancellationToken cancellationToken)
        {
            var listoftripuser = await _context.TripUsers
                .Include(t => t.Trip)
                .Include(t => t.Trip.City)
                .Include(t => t.Trip.Itinaries)
                .Where(x => x.UserId == request.UserId)
                .ToListAsync(cancellationToken: cancellationToken);
            return _mapper.Map<List<TripUserDto>>(listoftripuser);
        }
    }
}
