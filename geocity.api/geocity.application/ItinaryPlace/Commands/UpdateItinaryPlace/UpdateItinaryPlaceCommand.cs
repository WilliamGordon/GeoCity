using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.ItinaryPlace.Commands.UpdateItinaryPlace
{
    public class UpdateItinaryPlaceCommand : IRequest
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? Duration { get; set; }
    }

    public class UpdateItinaryPlaceCommandHandler : IRequestHandler<UpdateItinaryPlaceCommand>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public UpdateItinaryPlaceCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Unit> Handle(UpdateItinaryPlaceCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.ItinaryPlaces.FindAsync(request.Id);
            entity.Description = request.Description;
            entity.Price = request.Price;
            entity.Duration = request.Duration;
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
