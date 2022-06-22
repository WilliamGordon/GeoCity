using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.TripUserFavorite.Commands.Delete
{
    public class DeleteTripUserFavoriteCommand : IRequest
    {
        public Guid Id { get; set; }
    }

    public class DeleteTripUserFavoriteCommandHandler : IRequestHandler<DeleteTripUserFavoriteCommand>
    {
        private readonly GeoCityDbContext _context;

        public DeleteTripUserFavoriteCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(DeleteTripUserFavoriteCommand request, CancellationToken cancellationToken)
        {
            _context.TripUserFavorites.Remove(await _context.TripUserFavorites
               .Where(b => b.Id == request.Id)
               .SingleOrDefaultAsync(cancellationToken));
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
