using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.PointOfInterest.Commands.Update
{
    public class UpdatePointOfInterestCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public bool IsSuggestion { get; set; }
    }

    public class UpdatePointOfInterestCommandHandler : IRequestHandler<UpdatePointOfInterestCommand, Guid>
    {
        private readonly GeoCityDbContext _context;

        public UpdatePointOfInterestCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Guid> Handle(UpdatePointOfInterestCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var poi = await _context.PointOfInterest.FindAsync(request.Id);
                poi.IsSuggestion = request.IsSuggestion;
                await _context.SaveChangesAsync(cancellationToken);
                return poi.Id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
