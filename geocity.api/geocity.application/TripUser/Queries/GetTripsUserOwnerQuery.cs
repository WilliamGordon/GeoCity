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
    public class GetTripsUserOwnerQuery : IRequest<List<TripUserDto>>
    {
        public int UserId { get; set; }
    }

    public class GetTripsUsersQueryHandler : IRequestHandler<GetTripsUserOwnerQuery, List<TripUserDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetTripsUsersQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TripUserDto>> Handle(GetTripsUserOwnerQuery request, CancellationToken cancellationToken)
        {
            var listoftripuser = await _context.TripUsers
                .Include(t => t.Trip)
                .Include(t => t.Trip.City)
                .Include(t => t.Trip.Itinaries)
                .Where(x => x.UserId == request.UserId && x.IsOwner == true)
                .ToListAsync(cancellationToken: cancellationToken);
            return _mapper.Map<List<TripUserDto>>(listoftripuser);
        }
    }
}
