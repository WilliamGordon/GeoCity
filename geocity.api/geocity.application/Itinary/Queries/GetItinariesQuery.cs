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
    public class GetItinariesQuery : IRequest<List<ItinaryDto>>
    {
        public int TripId { get; set; }
    }
    public class GetItinariesQueryHandler : IRequestHandler<GetItinariesQuery, List<ItinaryDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetItinariesQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ItinaryDto>> Handle(GetItinariesQuery request, CancellationToken cancellationToken)
        {
            return _mapper.Map<List<ItinaryDto>>(await _context.Itinaries.Select(i => i.Trip.Id == request.TripId).ToListAsync(cancellationToken: cancellationToken));
        }
    }
}
