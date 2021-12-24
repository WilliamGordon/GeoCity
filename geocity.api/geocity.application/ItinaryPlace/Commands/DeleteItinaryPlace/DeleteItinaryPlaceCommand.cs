using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.ItinaryPlace.Commands.DeleteItinaryPlace
{
    public class DeleteItinaryPlaceCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteItinaryPlaceCommandHandler : IRequestHandler<DeleteItinaryPlaceCommand>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;

        public DeleteItinaryPlaceCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<Unit> Handle(DeleteItinaryPlaceCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.ItinaryPlaces
                .Where(b => b.Id == request.Id)
                .SingleOrDefaultAsync(cancellationToken);

            _context.ItinaryPlaces.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
