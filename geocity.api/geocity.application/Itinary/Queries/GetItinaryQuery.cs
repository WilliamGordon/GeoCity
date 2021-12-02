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
        public int Id { get; set; }
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
            return _mapper.Map<ItinaryDto>(await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.Id));
        }
    }
}
