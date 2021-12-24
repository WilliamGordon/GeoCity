using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Place.Commands.CreatePlace
{
    public class CreatePlaceCommand : IRequest<int>
    {
        public string? Name { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }

    public class CreatePlaceCommandHandler : IRequestHandler<CreatePlaceCommand, int>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreatePlaceCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<int> Handle(CreatePlaceCommand request, CancellationToken cancellationToken)
        {
            var entity = new geocity.domain.Entities.Place();
            entity.Name = request.Name;
            entity.Latitude = request.Latitude;
            entity.Longitude = request.Longitude;
            _context.Places.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
