using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUserRating.Queries
{
    public class GetTripUserRatingQuery : IRequest<TripUserRatingDto>
    {
        public string UserId { get; set; }
        public Guid TripId { get; set; }
    }
    public class GetTripUserRatingQueryHandler : IRequestHandler<GetTripUserRatingQuery, TripUserRatingDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetTripUserRatingQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TripUserRatingDto> Handle(GetTripUserRatingQuery request, CancellationToken cancellationToken)
        {
            var tripUser = await _context.TripUsers
                .SingleOrDefaultAsync(x => x.UserId == request.UserId && x.TripId == request.TripId);
            return _mapper.Map<TripUserRatingDto>(tripUser);
        }
    }
}