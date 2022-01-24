using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.TripUser.Commands.CreateTripUser
{
    public class CreateTripUserCommand : IRequest<int>
    {
        public int TripId { get; set; }
        public string UserId { get; set; }
        public bool IsOwner { get; set; }
        public bool IsParticipant { get; set; }
        public bool IsFavorite { get; set; }
        public decimal Rating { get; set; }
        public string Comment { get; set; }
    }

    public class CreateTripUserCommandHandler : IRequestHandler<CreateTripUserCommand, int>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateTripUserCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<int> Handle(CreateTripUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var entity = new geocity.domain.Entities.TripUser();
                entity.Trip = await _context.Trips.SingleOrDefaultAsync(x => x.Id == request.TripId);
                entity.UserId = request.UserId;
                entity.IsOwner = request.IsOwner;
                entity.IsParticipant = request.IsParticipant;
                entity.IsFavorite = request.IsFavorite;
                entity.Rating = request.Rating;
                entity.Comment = request.Comment;
                _context.TripUsers.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);
                return entity.Id;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return 0;
        }
    }
}
