using AutoMapper;
using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfCrossing.Commands.Update
{
    public class UpdateItinaryPointOfCrossingCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string? Description { get; set; }
    }

    public class UpdateItinaryPointOfCrossingCommandHandler : IRequestHandler<UpdateItinaryPointOfCrossingCommand, Guid>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public UpdateItinaryPointOfCrossingCommandHandler(IMediator mediator, GeoCityDbContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper;
        }

        public async Task<Guid> Handle(UpdateItinaryPointOfCrossingCommand request, CancellationToken cancellationToken)
        {
            // UPDATE THE itinary_POI
            var itinary_POC = await _context.ItinaryPointOfCrossings.FindAsync(request.Id);
            itinary_POC.Description = request.Description;
            await _context.SaveChangesAsync(cancellationToken);
            return itinary_POC.Id;
        }
    }
}
