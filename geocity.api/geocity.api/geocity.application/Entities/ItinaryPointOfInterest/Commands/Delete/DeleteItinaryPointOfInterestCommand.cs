using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfInterest.Commands.Delete
{
    public class DeleteItinaryPointOfInterestCommand : IRequest
    {
        public Guid Id { get; set; }
        public DateTime ModifiedDate { get; set; }
    }

    public class DeletePointOfInterestCommandHandler : IRequestHandler<DeleteItinaryPointOfInterestCommand>
    {
        private readonly GeoCityDbContext _context;

        public DeletePointOfInterestCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(DeleteItinaryPointOfInterestCommand request, CancellationToken cancellationToken)
        {
            checkIfPointOfInterestWasModified(request);
            _context.ItinaryPointOfInterests.Remove(await _context.ItinaryPointOfInterests
               .Where(b => b.Id == request.Id)
               .SingleOrDefaultAsync(cancellationToken));
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }

        public void checkIfPointOfInterestWasModified(DeleteItinaryPointOfInterestCommand request)
        {
            // GET POINT
            var poi = _context.ItinaryPointOfInterests.Where(b => b.Id == request.Id).SingleOrDefault();

            if (poi.ModifiedDate > request.ModifiedDate)
            {
                throw new Exception("This point was modified while you tried to delete it");
            }
        }
    }
}
