using AutoMapper;
using geocity.application.Entities.ItinaryPointOfInterest.Queries;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.ItinaryPointOfInterest.Commands.Update
{
    public class UpdateItinaryPointOfInterestCommand : IRequest<Guid>
    {
        public string UserUpdateId { get; set; }
        public Guid Id { get; set; }
        public decimal? Price { get; set; }
        public int? Duration { get; set; }
        public string? Description { get; set; }
        public DateTime ModifiedDate { get; set; }
    }

    public class UpdateItinaryPointOfInterestCommandHandler : IRequestHandler<UpdateItinaryPointOfInterestCommand, Guid>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public UpdateItinaryPointOfInterestCommandHandler(IMediator mediator, GeoCityDbContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper;
        }

        public async Task<Guid> Handle(UpdateItinaryPointOfInterestCommand request, CancellationToken cancellationToken)
        {
            checkIfPointOfInterestWasModified(request);
            // UPDATE THE itinary_POI
            var itinary_POI = await _context.ItinaryPointOfInterests.FindAsync(request.Id);
            itinary_POI.UserUpdate = await _context.Users.SingleOrDefaultAsync(x => x.Id == request.UserUpdateId, cancellationToken: cancellationToken);
            itinary_POI.Price = request.Price;
            itinary_POI.Duration = request.Duration;
            itinary_POI.Description = request.Description;
            await _context.SaveChangesAsync(cancellationToken);
            return itinary_POI.Id;
        }
        public void checkIfPointOfInterestWasModified(UpdateItinaryPointOfInterestCommand request)
        {
            // GET POINT
            var poi = _context.ItinaryPointOfInterests.Where(b => b.Id == request.Id).SingleOrDefault();

            if (poi.ModifiedDate > request.ModifiedDate)
            {
                throw new Exception("This point was modified while you tried to edit it");
            }
        }
    }
}
