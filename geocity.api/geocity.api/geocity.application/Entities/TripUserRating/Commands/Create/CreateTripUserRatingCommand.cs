using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUserRating.Commands
{
    public class CreateTripUserRatingCommand : IRequest<Guid>
    {
        public Guid TripId { get; set; }
        public string UserId { get; set; }
        public int Rating { get; set; }
    }

    public class CreateTripUserRatingCommandHandler : IRequestHandler<CreateTripUserRatingCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateTripUserRatingCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<Guid> Handle(CreateTripUserRatingCommand request, CancellationToken cancellationToken)
        {
            var entity = new geocity.domain.Entities.TripUserRating();
            entity.TripId = request.TripId;
            entity.UserId = request.UserId;
            entity.Rating = request.Rating;
            _context.TripUserRatings.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
