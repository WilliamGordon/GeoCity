using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfCrossing.Queries
{
    public class GetItinaryPointOfCrossingQuery : IRequest<ItinaryPointOfCrossingDto>
    {
        public Guid Id { get; set; }
    }

    public class GetItinaryPointOfInterestQueryHandler : IRequestHandler<GetItinaryPointOfCrossingQuery, ItinaryPointOfCrossingDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetItinaryPointOfInterestQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ItinaryPointOfCrossingDto> Handle(GetItinaryPointOfCrossingQuery request, CancellationToken cancellationToken)
        {
            var Itinary_POC = await _context.ItinaryPointOfCrossings
                .Include(t => t.PointOfCrossing)
                .Include(t => t.UserCreate)
                .Include(t => t.UserUpdate)
                .SingleOrDefaultAsync(x => x.Id == request.Id);
            var tripDto = _mapper.Map<ItinaryPointOfCrossingDto>(Itinary_POC);
            return tripDto;
        }
    }
}
