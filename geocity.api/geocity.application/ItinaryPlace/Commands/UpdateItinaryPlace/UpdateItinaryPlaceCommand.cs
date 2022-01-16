using AutoMapper;
using geocity.application.ItinaryPlace.Queries;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.ItinaryPlace.Commands.UpdateItinaryPlace
{
    public class UpdateItinaryPlaceCommand : IRequest<ItinaryPlaceDto>
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? Duration { get; set; }
    }

    public class UpdateItinaryPlaceCommandHandler : IRequestHandler<UpdateItinaryPlaceCommand, ItinaryPlaceDto>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public UpdateItinaryPlaceCommandHandler(IMediator mediator, GeoCityDbContext context, IMapper mapper)
        {
            _mediator = mediator;
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper;
        }

        public async Task<ItinaryPlaceDto> Handle(UpdateItinaryPlaceCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.ItinaryPlaces.FindAsync(request.Id);
            entity.Name = request.Name;
            entity.Description = request.Description;
            entity.Price = request.Price;
            entity.Duration = request.Duration;
            await _context.SaveChangesAsync(cancellationToken);

            var trip = await _context.ItinaryPlaces
                .Include(t => t.Place)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

            var tripDto = _mapper.Map<ItinaryPlaceDto>(trip);

            return tripDto;
        }
    }
}
