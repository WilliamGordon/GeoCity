using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUserRating.Commands.Update
{
    public class UpdateTripUserRatingCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public int Rating { get; set; }
    }

    public class UpdateTripUserRatingCommandHandler : IRequestHandler<UpdateTripUserRatingCommand, Guid>
    {
        private readonly GeoCityDbContext _context;

        public UpdateTripUserRatingCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Guid> Handle(UpdateTripUserRatingCommand request, CancellationToken cancellationToken)
        {
            // UPDATE THE itinary_POI
            var itinary_POI = await _context.TripUserRatings.FindAsync(request.Id);
            itinary_POI.Rating = request.Rating;
            await _context.SaveChangesAsync(cancellationToken);
            return itinary_POI.Id;
        }
    }
}
