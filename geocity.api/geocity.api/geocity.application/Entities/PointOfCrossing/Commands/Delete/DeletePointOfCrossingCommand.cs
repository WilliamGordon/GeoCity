using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.PointOfCrossing.Commands.Delete
{
    public class DeletePointOfCrossingCommand : IRequest
    {
        public Guid Id { get; set; }
    }

    public class DeletePointOfCrossingCommandHandler : IRequestHandler<DeletePointOfCrossingCommand>
    {
        private readonly GeoCityDbContext _context;

        public DeletePointOfCrossingCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(DeletePointOfCrossingCommand request, CancellationToken cancellationToken)
        {
            _context.PointOfCrossing.Remove(await _context.PointOfCrossing
               .Where(b => b.Id == request.Id)
               .SingleOrDefaultAsync(cancellationToken));
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
