using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.ItinaryPlace.Commands.CreateItinaryPlace
{
    public class CreateItinaryPlaceCommand : IRequest<int>
    {
        public int ItinaryId { get; set; }
        public int PlaceId { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? Duration { get; set; }
    }

    public class CreateItinaryPlaceCommandHandler : IRequestHandler<CreateItinaryPlaceCommand, int>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateItinaryPlaceCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<int> Handle(CreateItinaryPlaceCommand request, CancellationToken cancellationToken)
        {
            var entity = new geocity.domain.Entities.ItinaryPlace();
            entity.Itinary = await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.ItinaryId);
            entity.Place = await _context.Places.SingleOrDefaultAsync(x => x.Id == request.PlaceId);
            entity.Description = request.Description;
            entity.Price = request.Price;
            entity.Duration = request.Duration;
            _context.ItinaryPlaces.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
