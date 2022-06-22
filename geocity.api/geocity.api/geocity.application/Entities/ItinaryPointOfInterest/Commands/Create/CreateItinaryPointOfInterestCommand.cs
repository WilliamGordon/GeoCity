using geocity.application.Entities.PointOfInterest.Queries;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfInterest.Commands.Create
{
    public class CreateItinaryPointOfInterestCommand : IRequest<Guid>
    {
        public string UserCreateId { get; set; }
        public Guid ItinaryId { get; set; }
        public decimal? Price { get; set; }
        public int? Duration { get; set; }
        public string? Description { get; set; }
        public PointOfInterestDto PointOfInterest { get; set; }
    }

    public class CreateItinaryPlaceCommandHandler : IRequestHandler<CreateItinaryPointOfInterestCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateItinaryPlaceCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }
        public async Task<Guid> Handle(CreateItinaryPointOfInterestCommand request, CancellationToken cancellationToken)
        {
            // Check if PointOfInterest Is already created
            var POI = await _context.PointOfInterest.SingleOrDefaultAsync(x => x.OsmId == request.PointOfInterest.OsmId);

            // Handle Position
            // 1. Get list of points for Itinary
            // 2. Get the latest points
            // 3. Icrement by one
            //var POCMaxPosition = _context.ItinaryPointOfCrossings.Where(x => x.ItinaryId == request.ItinaryId).Max(x => (int?)x.Position) ?? 0;
            //var POIMaxPosition = _context.ItinaryPointOfInterests.Where(x => x.ItinaryId == request.ItinaryId).Max(x => (int?)x.Position) ?? 0;
            //var position = 0;
            //if (POCMaxPosition > POIMaxPosition)
            //{
            //    position = POCMaxPosition + 1;
            //}
            //else
            //{
            //    position = POIMaxPosition + 1;
            //}

            if (POI == null)
            {
                POI = new geocity.domain.Entities.PointOfInterest();
                POI.OsmId = request.PointOfInterest.OsmId;
                POI.Name = request.PointOfInterest.Name;
                POI.Category = request.PointOfInterest.Category;
                POI.Latitude = request.PointOfInterest.Latitude;
                POI.Longitude = request.PointOfInterest.Longitude;
                POI.Address = request.PointOfInterest.Address;
                POI.IsSuggestion = request.PointOfInterest.IsSuggestion;
                POI.CityId = request.PointOfInterest.CityId;
                _context.PointOfInterest.Add(POI);
                await _context.SaveChangesAsync(cancellationToken);

                var Itinary_POI = new geocity.domain.Entities.ItinaryPointOfInterest();
                Itinary_POI.UserCreate = await _context.Users.SingleOrDefaultAsync(x => x.Id == request.UserCreateId, cancellationToken: cancellationToken);
                Itinary_POI.UserUpdate = await _context.Users.SingleOrDefaultAsync(x => x.Id == request.UserCreateId, cancellationToken: cancellationToken);
                Itinary_POI.Itinary = await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.ItinaryId, cancellationToken: cancellationToken);
                Itinary_POI.PointOfInterest = await _context.PointOfInterest.SingleOrDefaultAsync(x => x.Id == POI.Id);
                Itinary_POI.Description = request.Description;
                Itinary_POI.Price = request.Price;
                Itinary_POI.Duration = request.Duration;
                //Itinary_POI.Position = position;
                _context.ItinaryPointOfInterests.Add(Itinary_POI);
                await _context.SaveChangesAsync(cancellationToken);
                return Itinary_POI.Id;
            }
            else
            {
                var Itinary_POI = new geocity.domain.Entities.ItinaryPointOfInterest();
                Itinary_POI.UserCreate = await _context.Users.SingleOrDefaultAsync(x => x.Id == request.UserCreateId, cancellationToken: cancellationToken);
                Itinary_POI.UserUpdate = await _context.Users.SingleOrDefaultAsync(x => x.Id == request.UserCreateId, cancellationToken: cancellationToken);
                Itinary_POI.Itinary = await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.ItinaryId, cancellationToken: cancellationToken);
                Itinary_POI.PointOfInterest = POI;
                Itinary_POI.Description = request.Description;
                Itinary_POI.Price = request.Price;
                Itinary_POI.Duration = request.Duration;
                //Itinary_POI.Position = position;
                _context.ItinaryPointOfInterests.Add(Itinary_POI);
                await _context.SaveChangesAsync(cancellationToken);
                return Itinary_POI.Id;
            }
        }
    }
}
