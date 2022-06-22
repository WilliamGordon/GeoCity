using AutoMapper;
using geocity.application.City.Queries;
using geocity.application.Entities.City.Queries;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.City.Queries
{
    public class GetCitiesQuery : IRequest<List<CityOverviewDto>>
    {

    }

    public class GetCitiesQueryHandler : IRequestHandler<GetCitiesQuery, List<CityOverviewDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetCitiesQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<CityOverviewDto>> Handle(GetCitiesQuery request, CancellationToken cancellationToken)
        {
            var citiesDto = _mapper.Map<List<CityOverviewDto>>(await _context.Cities.ToListAsync(cancellationToken: cancellationToken));
            foreach (var city in citiesDto)
            {
                var trips = await _context.Trips.Where(x => x.City.Id == city.Id).ToListAsync();
                var Pois = await _context.PointOfInterest.Where(x => x.City.Id == city.Id).ToListAsync();
                city.NbTrips = trips.Count;
                city.NbPointOfInterests = Pois.Count;
            }
            return citiesDto;
        }
    }
}
