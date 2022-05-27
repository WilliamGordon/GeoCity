﻿using geocity.application.Entities.PointOfInterest.Queries;
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
            
            if (POI == null)
            {
                POI = new geocity.domain.Entities.PointOfInterest();
                POI.OsmId = request.PointOfInterest.OsmId;
                POI.Name = request.PointOfInterest.Name;
                POI.Category = request.PointOfInterest.Category;
                POI.Latitude = request.PointOfInterest.Latitude;
                POI.Longitude = request.PointOfInterest.Longitude;
                POI.IsSuggestion = request.PointOfInterest.IsSuggestion;
                POI.CityId = request.PointOfInterest.CityId;
                _context.PointOfInterest.Add(POI);
                await _context.SaveChangesAsync(cancellationToken);

                var Itinary_POI = new geocity.domain.Entities.ItinaryPointOfInterest();
                Itinary_POI.Itinary = await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.ItinaryId, cancellationToken: cancellationToken);
                Itinary_POI.PointOfInterest = await _context.PointOfInterest.SingleOrDefaultAsync(x => x.Id == POI.Id);
                Itinary_POI.Description = request.Description;
                Itinary_POI.Price = request.Price;
                Itinary_POI.Duration = request.Duration;
                _context.ItinaryPointOfInterests.Add(Itinary_POI);
                await _context.SaveChangesAsync(cancellationToken);
                return Itinary_POI.Id;
            }
            else
            {
                var Itinary_POI = new geocity.domain.Entities.ItinaryPointOfInterest();
                Itinary_POI.Itinary = await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.ItinaryId, cancellationToken: cancellationToken);
                Itinary_POI.PointOfInterest = POI;
                Itinary_POI.Description = request.Description;
                Itinary_POI.Price = request.Price;
                Itinary_POI.Duration = request.Duration;
                _context.ItinaryPointOfInterests.Add(Itinary_POI);
                await _context.SaveChangesAsync(cancellationToken);
                return Itinary_POI.Id;
            }
        }
    }
}
