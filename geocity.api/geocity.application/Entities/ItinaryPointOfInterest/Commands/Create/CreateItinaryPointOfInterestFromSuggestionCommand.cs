using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfInterest.Commands.Create
{
    public class CreateItinaryPointOfInterestFromSuggestionCommand : IRequest<Guid>
    {
        public Guid ItinaryId { get; set; }
        public Guid PointOfInterestId { get; set; }
        public string UserCreateId { get; set; }
    }

    public class CreateItinaryPointOfInterestFromSuggestionCommandHandler : IRequestHandler<CreateItinaryPointOfInterestFromSuggestionCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public CreateItinaryPointOfInterestFromSuggestionCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }
        public async Task<Guid> Handle(CreateItinaryPointOfInterestFromSuggestionCommand request, CancellationToken cancellationToken)
        {
            var Itinary_POI = new geocity.domain.Entities.ItinaryPointOfInterest();
            Itinary_POI.UserCreate = await _context.Users.SingleOrDefaultAsync(x => x.Id == request.UserCreateId, cancellationToken: cancellationToken);
            Itinary_POI.UserUpdate = await _context.Users.SingleOrDefaultAsync(x => x.Id == request.UserCreateId, cancellationToken: cancellationToken);
            Itinary_POI.Itinary = await _context.Itinaries.SingleOrDefaultAsync(x => x.Id == request.ItinaryId, cancellationToken: cancellationToken);
            Itinary_POI.PointOfInterest = await _context.PointOfInterest.SingleOrDefaultAsync(x => x.Id == request.PointOfInterestId); ;
            //Itinary_POI.Position = position;
            _context.ItinaryPointOfInterests.Add(Itinary_POI);
            await _context.SaveChangesAsync(cancellationToken);
            return Itinary_POI.Id;
        }
    }
}
