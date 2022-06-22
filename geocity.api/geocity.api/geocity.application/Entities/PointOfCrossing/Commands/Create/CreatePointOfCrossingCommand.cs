using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.PointOfCrossing.Commands.Create
{
    public class CreatePointOfCrossingCommand : IRequest<Guid>
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Address { get; set; }
    }

    public class CreatePointOfCrossingCommandHandler : IRequestHandler<CreatePointOfCrossingCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreatePointOfCrossingCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<Guid> Handle(CreatePointOfCrossingCommand request, CancellationToken cancellationToken)
        {
            var entity = new geocity.domain.Entities.PointOfCrossing();
            entity.Latitude = request.Latitude;
            entity.Longitude = request.Longitude;
            entity.Address = request.Address;
            _context.PointOfCrossing.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
