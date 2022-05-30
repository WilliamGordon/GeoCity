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
            return _mapper.Map<List<TripUserDto>>(tripUsers);
        }
    }
}
