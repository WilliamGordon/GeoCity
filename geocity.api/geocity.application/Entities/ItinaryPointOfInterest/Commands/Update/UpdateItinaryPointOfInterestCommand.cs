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
    public class UpdateItinaryPointOfInterestCommand : IRequest<ItinaryPointOfInterestDto>
    {
        public Guid Id { get; set; }
        public decimal? Price { get; set; }
        public int? Duration { get; set; }
        public string? Description { get; set; }
    }

    public class UpdateItinaryPointOfInterestCommandHandler : IRequestHandler<UpdateItinaryPointOfInterestCommand, ItinaryPointOfInterestDto>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public UpdateItinaryPointOfInterestCommandHandler(IMediator mediator, GeoCityDbContext context, IMapper mapper)
        {
            _mediator = mediator;
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper;
        }

        public async Task<ItinaryPointOfInterestDto> Handle(UpdateItinaryPointOfInterestCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.ItinaryPointOfInterests.FindAsync(request.Id);
            entity.Price = request.Price;
            entity.Duration = request.Duration;
            entity.Description = request.Description;
            await _context.SaveChangesAsync(cancellationToken);

            var trip = await _context.ItinaryPointOfInterests
                .Include(t => t.PointOfInterest)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

            var tripDto = _mapper.Map<ItinaryPointOfInterestDto>(trip);

            return tripDto;
        }
    }
}
