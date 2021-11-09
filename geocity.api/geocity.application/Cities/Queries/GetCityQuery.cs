using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Cities.Queries
{
    public class GetCityQuery : IRequest<CityDto>
    {
        public int Id { get; set; }
    }

    public class GetCityQueryHandler : IRequestHandler<GetCityQuery, CityDto>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetCityQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CityDto> Handle(GetCityQuery request, CancellationToken cancellationToken)
        {
            return _mapper.Map<CityDto>(await _context.Cities.SingleOrDefaultAsync(x => x.Id == request.Id));
        }
    }
}
