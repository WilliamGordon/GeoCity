using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.Trip.Commands.UpdateTrip
{
    public class PublishTripCommand : IRequest<Guid>
    {
        public Guid TripId { get; set; }
        public string UserId { get; set; }
    }

    public class PublishTripCommandHandler : IRequestHandler<PublishTripCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public PublishTripCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<Guid> Handle(PublishTripCommand request, CancellationToken cancellationToken)
        {
            // TODO : CHECK IF USER IS OWNER
            try
            {
                var tripUser = await _context.TripUsers
                .SingleOrDefaultAsync(x => x.UserId == request.UserId && x.TripId == request.TripId);

                if (tripUser.IsOwner == false)
                {
                    throw new Exception("You're not the owner of this trip. Only the owner can publish a trip !"); 
                }

                var trip = await _context.Trips.FindAsync(request.TripId);
                trip.IsPublished = true;
                await _context.SaveChangesAsync(cancellationToken);
                return trip.Id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
