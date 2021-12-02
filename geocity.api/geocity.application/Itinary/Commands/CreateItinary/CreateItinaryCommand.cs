using geocity.infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Itinary.Commands.CreateItinary
{
    public class CreateItinaryCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string CityName { get; set; }
        public decimal CityLat { get; set; }
        public decimal CityLng { get; set; }
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
            entity.Name = request.Name;
            entity.Description = request.Description;
            entity.CityName = request.CityName;
            entity.CityLat = request.CityLat;
            entity.CityLng = request.CityLng;
            _context.Itinaries.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
