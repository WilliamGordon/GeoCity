using geocity.application.Entities.PointOfCrossing.Queries;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfCrossing.Commands.Create
{
    public class CreateItinaryPointOfCrossingCommand : IRequest<Guid>
    {
        public Guid ItinaryId { get; set; }
        public string? Description { get; set; }
        public PointOfCrossingDto PointOfCrossing { get; set; }
    }

    public class CreateItinaryPointOfCrossingCommandHandler : IRequestHandler<CreateItinaryPointOfCrossingCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateItinaryPointOfCrossingCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }
        public async Task<Guid> Handle(CreateItinaryPointOfCrossingCommand request, CancellationToken cancellationToken)
        {
            // Check if PointOfCrossing Is already created
            var POC = await _context.PointOfCrossing.SingleOrDefaultAsync(x => x.Latitude == request.PointOfCrossing.Latitude && x.Longitude == request.PointOfCrossing.Longitude);

            if (POC == null)
            {
                POC = new geocity.domain.Entities.PointOfCrossing();
                POC.Latitude = request.PointOfCrossing.Latitude;
                POC.Longitude = request.PointOfCrossing.Longitude;
                POC.CityId = request.PointOfCrossing.CityId;
                _context.PointOfCrossing.Add(POC);
                await _context.SaveChangesAsync(cancellationToken);

                var Itinary_POC = new geocity.domain.Entities.ItinaryPointOfCrossing();
                Itinary_POC.Itinary = await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.ItinaryId, cancellationToken: cancellationToken);
                Itinary_POC.PointOfCrossing = await _context.PointOfCrossing.SingleOrDefaultAsync(x => x.Id == POC.Id);
                Itinary_POC.Description = request.Description;
                _context.ItinaryPointOfCrossings.Add(Itinary_POC);
                await _context.SaveChangesAsync(cancellationToken);
                return Itinary_POC.Id;
            }
            else
            {
                var Itinary_POC = new geocity.domain.Entities.ItinaryPointOfCrossing();
                Itinary_POC.Itinary = await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.ItinaryId, cancellationToken: cancellationToken);
                Itinary_POC.PointOfCrossing = POC;
                Itinary_POC.Description = request.Description;
                _context.ItinaryPointOfCrossings.Add(Itinary_POC);
                await _context.SaveChangesAsync(cancellationToken);
                return Itinary_POC.Id;
            }
        }
    }
}
