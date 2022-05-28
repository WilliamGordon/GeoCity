using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Itinary.Queries
{
    public class GetItinaryQuery : IRequest<ItinaryDto>
    {
        public Guid Id { get; set; }
    }

    public class GetItinaryQueryHandler : IRequestHandler<GetItinaryQuery, ItinaryDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetItinaryQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ItinaryDto> Handle(GetItinaryQuery request, CancellationToken cancellationToken)
        {
            var itinary = await _context.Itinaries
                .Include(t => t.ItinaryPointOfCrossing)
                .ThenInclude(t => t.PointOfCrossing)
                .Include(t => t.ItinaryPointOfInterest)
                .ThenInclude(t => t.PointOfInterest)
                .SingleOrDefaultAsync(x => x.Id == request.Id);
            var itinaryDto = _mapper.Map<ItinaryDto>(itinary);
            return itinaryDto;
        }
    }
}
