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
    public class DeletePointOfInterestCommand : IRequest
    {
        public Guid Id { get; set; }
    }

    public class DeletePointOfInterestCommandHandler : IRequestHandler<DeletePointOfInterestCommand>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;

        public DeletePointOfInterestCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }
        public async Task<Unit> Handle(DeletePointOfInterestCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.ItinaryPointOfInterests
               .Where(b => b.Id == request.Id)
               .SingleOrDefaultAsync(cancellationToken);

            _context.ItinaryPointOfInterests.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
