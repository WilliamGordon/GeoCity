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
        public Guid PointOfInterestId { get; set; }
        public decimal? Price { get; set; }
        public int? Duration { get; set; }
        public string? Description { get; set; }
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
            var entity = new geocity.domain.Entities.ItinaryPointOfInterest();
            entity.Itinary = await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.ItinaryId, cancellationToken: cancellationToken);
            entity.PointOfInterest = await _context.PointOfInterest.SingleOrDefaultAsync(x => x.Id == request.PointOfInterestId);
            entity.Description = request.Description;
            entity.Price = request.Price;
            entity.Duration = request.Duration;
            _context.ItinaryPointOfInterests.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
