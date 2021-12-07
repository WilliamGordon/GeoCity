using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Itinary.Commands.CreateItinary
{
    public class CreateItinaryCommand : IRequest<int>
    {
        public int TripId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Distance { get; set; }
        public string Duration { get; set; }
        public int Day { get; set; }
    }
    public class CreateItinaryCommandHandler : IRequestHandler<CreateItinaryCommand, int>
    {
        private readonly GeoCityDbContext _context;
        public CreateItinaryCommandHandler(GeoCityDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateItinaryCommand request, CancellationToken cancellationToken)
        {
            var entity = new geocity.domain.Entities.Itinary();
            entity.Trip = _context.Trips.SingleOrDefault(x => x.Id == request.TripId);
            entity.Name = request.Name;
            entity.Description = request.Description;
            entity.Distance = request.Distance;
            entity.Duration = request.Duration;
            entity.Day = request.Day;
            _context.Itinaries.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
