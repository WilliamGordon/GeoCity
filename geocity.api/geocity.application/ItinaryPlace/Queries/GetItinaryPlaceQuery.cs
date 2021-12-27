using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.ItinaryPlace.Queries
{
    public class GetItinaryPlaceQuery : IRequest<ItinaryPlaceDto>
    {
        public int Id { get; set; }
    }

    public class GetItinaryPlaceQueryHandler : IRequestHandler<GetItinaryPlaceQuery, ItinaryPlaceDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetItinaryPlaceQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ItinaryPlaceDto> Handle(GetItinaryPlaceQuery request, CancellationToken cancellationToken)
        {
            var trip = await _context.ItinaryPlaces
                .Include(t => t.Place)
                .SingleOrDefaultAsync(x => x.Id == request.Id);
            var tripDto = _mapper.Map<ItinaryPlaceDto>(trip);
            return tripDto;
        }
    }
}
