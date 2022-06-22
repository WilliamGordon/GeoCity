using geocity.domain.Entities;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Cities.Commands.Create
{
    public class CreateCityCommand : IRequest<Guid>
    {
        public string Name { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }

    public class CreateCityCommandHandler : IRequestHandler<CreateCityCommand, Guid>
    {
        private readonly GeoCityDbContext _context;
        public CreateCityCommandHandler(GeoCityDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateCityCommand request, CancellationToken cancellationToken)
        {
            var entity = new geocity.domain.Entities.City();
            entity.Name = request.Name;
            entity.Latitude = request.Latitude;
            entity.Longitude = request.Longitude;

            var city = await _context.Cities.SingleOrDefaultAsync(x => x.Name == request.Name && x.Latitude == request.Latitude && x.Longitude == request.Longitude);

            if (city == null)
            {
                _context.Cities.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);
                return entity.Id;
            }
            else
            {
                return city.Id;
            }
        }
    }
}
