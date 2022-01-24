using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.TripUser.Queries
{
    public class GetTripsUserParticipantQuery : IRequest<List<TripUserDto>>
    {
        public string UserId { get; set; }
    }

    public class GetTripsUserParticipantQueryHandler : IRequestHandler<GetTripsUserParticipantQuery, List<TripUserDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetTripsUserParticipantQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TripUserDto>> Handle(GetTripsUserParticipantQuery request, CancellationToken cancellationToken)
        {
            var listoftripuser = await _context.TripUsers
                .Include(t => t.Trip)
                .Include(t => t.Trip.City)
                .Include(t => t.Trip.Itinaries)
                .Where(x => x.UserId == request.UserId && x.IsParticipant == true)
                .ToListAsync(cancellationToken: cancellationToken);
            return _mapper.Map<List<TripUserDto>>(listoftripuser);
        }
    }
}
