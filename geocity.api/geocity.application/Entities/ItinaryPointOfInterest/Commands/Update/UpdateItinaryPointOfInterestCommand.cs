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
        public Guid Id { get; set; }
        public decimal? Price { get; set; }
        public int? Duration { get; set; }
        public string? Description { get; set; }
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
            // UPDATE THE itinary_POI
            var itinary_POI = await _context.ItinaryPointOfInterests.FindAsync(request.Id);
            itinary_POI.Price = request.Price;
            itinary_POI.Duration = request.Duration;
            itinary_POI.Description = request.Description;
            await _context.SaveChangesAsync(cancellationToken);
            return itinary_POI.Id;
        }
    }
}
