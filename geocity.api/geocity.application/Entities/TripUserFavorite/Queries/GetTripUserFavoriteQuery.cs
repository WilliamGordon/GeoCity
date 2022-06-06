using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUserFavorite.Queries
{
    public class GetTripUserFavoriteQuery : IRequest<TripUserFavoriteDto>
    {
        public string UserId { get; set; }
        public Guid TripId { get; set; }
    }
    public class GetTripUserFavoriteQueryHandler : IRequestHandler<GetTripUserFavoriteQuery, TripUserFavoriteDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetTripUserFavoriteQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TripUserFavoriteDto> Handle(GetTripUserFavoriteQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var tripUser = await _context.TripUserFavorites
               .SingleOrDefaultAsync(x => x.UserId == request.UserId && x.TripId == request.TripId);
                return _mapper.Map<TripUserFavoriteDto>(tripUser);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
