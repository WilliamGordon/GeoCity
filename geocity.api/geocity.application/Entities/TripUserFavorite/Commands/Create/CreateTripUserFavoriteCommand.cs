using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUserFavorite.Commands.Create
{
    public class CreateTripUserFavoriteCommand : IRequest<Guid>
    {
        public Guid TripId { get; set; }
        public string UserId { get; set; }
    }

    public class CreateTripUserFavoriteCommandHandler : IRequestHandler<CreateTripUserFavoriteCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateTripUserFavoriteCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<Guid> Handle(CreateTripUserFavoriteCommand request, CancellationToken cancellationToken)
        {
            var entity = new geocity.domain.Entities.TripUserFavorite();
            entity.TripId = request.TripId;
            entity.UserId = request.UserId;
            _context.TripUserFavorites.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
