using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfCrossing.Commands.Delete
{
    public class DeleteItinaryPointOfCrossingCommand : IRequest
    {
        public Guid Id { get; set; }
        public DateTime ModifiedDate { get; set; }
    }

    public class DeleteItinaryPointOfCrossingCommandHandler : IRequestHandler<DeleteItinaryPointOfCrossingCommand>
    {
        private readonly GeoCityDbContext _context;

        public DeleteItinaryPointOfCrossingCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(DeleteItinaryPointOfCrossingCommand request, CancellationToken cancellationToken)
        {
            checkIfPointOfInterestWasModified(request);
            _context.ItinaryPointOfCrossings.Remove(await _context.ItinaryPointOfCrossings
               .Where(b => b.Id == request.Id)
               .SingleOrDefaultAsync(cancellationToken));
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }

        public void checkIfPointOfInterestWasModified(DeleteItinaryPointOfCrossingCommand request)
        {
            // GET POINT
            var poi = _context.ItinaryPointOfCrossings.Where(b => b.Id == request.Id).SingleOrDefault();

            if (poi.ModifiedDate > request.ModifiedDate)
            {
                throw new Exception("This point was modified while you tried to delete it");
            }
        }
    }
}
