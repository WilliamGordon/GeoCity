using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfInterest.Queries
{
    public class GetItinaryPointOfInterestQuery : IRequest<ItinaryPointOfInterestDto>
    {
        public Guid Id { get; set; }
    }

    public class GetItinaryPointOfInterestQueryHandler : IRequestHandler<GetItinaryPointOfInterestQuery, ItinaryPointOfInterestDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetItinaryPointOfInterestQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ItinaryPointOfInterestDto> Handle(GetItinaryPointOfInterestQuery request, CancellationToken cancellationToken)
        {
            var trip = await _context.ItinaryPointOfInterests
                .Include(t => t.PointOfInterest)
                .SingleOrDefaultAsync(x => x.Id == request.Id);
            var tripDto = _mapper.Map<ItinaryPointOfInterestDto>(trip);
            return tripDto;
        }
    }
}
