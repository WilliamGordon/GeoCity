using geocity.infrastructure;
using MediatR;

namespace geocity.application.Itinary.Commands.CreateItinary
{
    public class CreateItinaryCommand : IRequest<Guid>
    {
        public int Day { get; set; }
        public Guid TripId { get; set; }
        public decimal? Distance { get; set; }
        public int? Duration { get; set; }
    }

    public class CreateItinaryCommandHandler : IRequestHandler<CreateItinaryCommand, Guid>
    {
        private readonly GeoCityDbContext _context;
        public CreateItinaryCommandHandler(GeoCityDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateItinaryCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var entity = new geocity.domain.Entities.Itinary();
                entity.Trip = _context.Trips.SingleOrDefault(x => x.Id == request.TripId);
                entity.Day = request.Day;
                _context.Itinaries.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);
                return entity.Id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
