using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.PointOfCrossing.Queries
{
    public class GetPointOfCrossingQuery : IRequest<PointOfCrossingDto>
    {
        public Guid Id { get; set; }
    }

    public class GetPointOfInterestQueryHandler : IRequestHandler<GetPointOfCrossingQuery, PointOfCrossingDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetPointOfInterestQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PointOfCrossingDto> Handle(GetPointOfCrossingQuery request, CancellationToken cancellationToken)
        {
            var trip = await _context.PointOfCrossing
                .SingleOrDefaultAsync(x => x.Id == request.Id);
            var tripDto = _mapper.Map<PointOfCrossingDto>(trip);
            return tripDto;
        }
    }
}
