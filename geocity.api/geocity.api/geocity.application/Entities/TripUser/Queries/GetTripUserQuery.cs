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
    public class GetTripUserQuery : IRequest<TripUserDto>
    {
        public string UserId { get; set; }
        public Guid TripId { get; set; }
    }
    public class GetTripUserQueryHandler : IRequestHandler<GetTripUserQuery, TripUserDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetTripUserQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TripUserDto> Handle(GetTripUserQuery request, CancellationToken cancellationToken)
        {
            var tripUser = await _context.TripUsers
                .SingleOrDefaultAsync(x => x.UserId == request.UserId && x.TripId == request.TripId);
            return _mapper.Map<TripUserDto>(tripUser);
        }
    }
}
