using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.PointOfInterest.Queries
{
    public class GetPointOfInterestQuery : IRequest<PointOfInterestDto>
    {
        public Guid Id { get; set; }
    }

    public class GetPointOfInterestQueryHandler : IRequestHandler<GetPointOfInterestQuery, PointOfInterestDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetPointOfInterestQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PointOfInterestDto> Handle(GetPointOfInterestQuery request, CancellationToken cancellationToken)
        {
            var trip = await _context.PointOfInterest
                .SingleOrDefaultAsync(x => x.Id == request.Id);
            var tripDto = _mapper.Map<PointOfInterestDto>(trip);
            return tripDto;
        }
    }
}
