using geocity.application.Cities.Commands.CreateCity;
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
    public class CreateTripCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int NbDays { get; set; }
        public int CityId { get; set; }
    }

    public class CreateTripCommandHandler : IRequestHandler<CreateTripCommand, int>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateTripCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<int> Handle(CreateTripCommand request, CancellationToken cancellationToken)
        {

            //await _mediator.Send(new CreateCityCommand());

            var entity = new geocity.domain.Entities.Trip();
            entity.Name = request.Name;
            entity.Description = request.Description;
            entity.NbDays = request.NbDays;
            entity.City = await _context.Cities.SingleOrDefaultAsync(x => x.Id == request.CityId);
            _context.Trips.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
