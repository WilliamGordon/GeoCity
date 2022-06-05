using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.Trip.Commands.UpdateTrip
{
    public class UpdateTripCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class UpdateTripCommandHandler : IRequestHandler<UpdateTripCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public UpdateTripCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<Guid> Handle(UpdateTripCommand request, CancellationToken cancellationToken)
        {
            // TODO : CHECK IF USER IS OWNER
            try
            {
                var trip = await _context.Trips.SingleOrDefaultAsync(x => x.Id == request.Id);
                trip.Name = request.Name;
                trip.Description = request.Description;
                await _context.SaveChangesAsync(cancellationToken);
                return trip.Id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
