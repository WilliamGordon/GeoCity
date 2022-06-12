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
    public class GetAllPointOfInterestsQuery : IRequest<List<PointOfInterestDto>>
    {
        public Guid Id { get; set; }
    }

    public class GetAllPointOfInterestsQueryHandler : IRequestHandler<GetAllPointOfInterestsQuery, List<PointOfInterestDto>>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public GetAllPointOfInterestsQueryHandler(GeoCityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PointOfInterestDto>> Handle(GetAllPointOfInterestsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var pois = await _context.PointOfInterest.Where(i => i.CityId == request.Id).ToListAsync(cancellationToken: cancellationToken);
                var poisDto = _mapper.Map<List<PointOfInterestDto>>(pois);

                foreach (var poi in poisDto)
                {
                    var smallPrice = _context.ItinaryPointOfInterests.Where(x => x.PointOfInterestId == poi.Id && x.Price != 0).Min(x => x.Price);
                    var BigPrice = _context.ItinaryPointOfInterests.Where(x => x.PointOfInterestId == poi.Id).Max(x => x.Price);
                    var smallDuration = _context.ItinaryPointOfInterests.Where(x => x.PointOfInterestId == poi.Id && x.Price != 0).Min(x => x.Duration);
                    var BigDuration = _context.ItinaryPointOfInterests.Where(x => x.PointOfInterestId == poi.Id).Max(x => x.Duration);
                    var NbTimeUsed = _context.ItinaryPointOfInterests.Where(x => x.PointOfInterestId == poi.Id).Count();
                    poi.PriceRange = $"{smallPrice} - {BigPrice}";
                    poi.DurationRange = $"{smallDuration} - {BigDuration}";
                    poi.NbTimeUsed = NbTimeUsed;
                }

                return poisDto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
