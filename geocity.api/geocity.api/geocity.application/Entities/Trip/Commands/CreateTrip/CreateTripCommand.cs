using geocity.application.Cities.Commands.Create;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Trip.Commands.CreateTrip
{
    public class CreateTripCommand : IRequest<Guid>
    {
        public Guid CityId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Days { get; set; }
    }

    public class CreateTripCommandHandler : IRequestHandler<CreateTripCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateTripCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<Guid> Handle(CreateTripCommand request, CancellationToken cancellationToken)
        {

            //await _mediator.Send(new CreateCityCommand());

            var entity = new geocity.domain.Entities.Trip();
            entity.Name = request.Name;
            entity.Description = request.Description;
            entity.Days = request.Days;
            entity.City = await _context.Cities.SingleOrDefaultAsync(x => x.Id == request.CityId);
            _context.Trips.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
