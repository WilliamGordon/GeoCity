using AutoMapper;
using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.Itinary.Commands.Update
{
    public class UpdateItinaryCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public decimal? Distance { get; set; }
        public int? Duration { get; set; }
    }

    public class UpdateItinaryCommandHandler : IRequestHandler<UpdateItinaryCommand, Guid>
    {
        private readonly GeoCityDbContext _context;

        public UpdateItinaryCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Guid> Handle(UpdateItinaryCommand request, CancellationToken cancellationToken)
        {
            var itinary = await _context.Itinaries.FindAsync(request.Id);
            itinary.Duration = request.Duration;
            itinary.Distance = request.Distance;
            await _context.SaveChangesAsync(cancellationToken);
            return itinary.Id;
        }
    }
}
