using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.TripUser.Commands.Create
{
    public class CreateTripUserCommand : IRequest<Guid>
    {
        public Guid TripId { get; set; }
        public string UserId { get; set; }
        public bool IsOwner { get; set; }
    }

    public class CreateTripUserCommandHandler : IRequestHandler<CreateTripUserCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateTripUserCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<Guid> Handle(CreateTripUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                checkIfUserIsAlreadyParticipant(request);
                checkIfMaxParticipant(request);
                var entity = new geocity.domain.Entities.TripUser();
                entity.Trip = await _context.Trips.SingleOrDefaultAsync(x => x.Id == request.TripId);
                entity.UserId = request.UserId;
                entity.IsOwner = request.IsOwner;
                _context.TripUsers.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);
                return entity.Id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public void checkIfUserIsAlreadyParticipant(CreateTripUserCommand request)
        {
            var nbTimeSubscribed = _context.TripUsers.Where(x => x.Trip.Id == request.TripId && x.User.Id == request.UserId).ToList().Count;
            if(nbTimeSubscribed >= 1)
            {
                throw new Exception("You already subscribed to this trip");
            }
        }

        public void checkIfMaxParticipant(CreateTripUserCommand request)
        {
            var nbSubscription = _context.TripUsers.Where(x => x.Trip.Id == request.TripId).ToList().Count;
            if (nbSubscription > 5)
            {
                throw new Exception("The Trip is full you !");
            }
        }
    }
}
