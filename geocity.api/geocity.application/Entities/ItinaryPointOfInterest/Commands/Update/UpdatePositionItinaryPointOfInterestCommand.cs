using AutoMapper;
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
    public class UpdatePositionItinaryPointOfInterestCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public int Position { get; set; }
        public string UserUpdateId { get; set; }
    }

    public class UpdatePositionItinaryPointOfInterestCommandHandler : IRequestHandler<UpdatePositionItinaryPointOfInterestCommand, Guid>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public UpdatePositionItinaryPointOfInterestCommandHandler(IMediator mediator, GeoCityDbContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper;
        }

        public async Task<Guid> Handle(UpdatePositionItinaryPointOfInterestCommand request, CancellationToken cancellationToken)
        {
            var POI = _context.ItinaryPointOfInterests.Where(x => x.Id == request.Id).SingleOrDefault();

            var CurrentPosition = POI.Position;

            if (CurrentPosition != request.Position)
            {
                var POCS = _context.ItinaryPointOfCrossings.Where(x => x.ItinaryId == POI.ItinaryId).ToList();
                var POIS = _context.ItinaryPointOfInterests.Where(x => x.ItinaryId == POI.ItinaryId).ToList();

                // CREATE DICTIONNARY
                List<KeyValuePair<int, Guid>>? pointsList = new List<KeyValuePair<int, Guid>>();

                // STORE THE POINTS IN DICTIONNARY
                foreach (var poc in POCS)
                {
                    KeyValuePair<int, Guid> pItem = new KeyValuePair<int, Guid>(poc.Position, poc.Id);
                    pointsList.Add(pItem);
                }

                foreach (var poi in POIS)
                {
                    KeyValuePair<int, Guid> pItem = new KeyValuePair<int, Guid>(poi.Position, poi.Id);
                    pointsList.Add(pItem);
                }

                // SORT THE LIST
                pointsList = pointsList.OrderBy(x => x.Key).ToList();

                // REMOVE POINT FROM THE LIST
                var p = pointsList.Find(x => x.Value == POI.Id);
                pointsList.Remove(p);

                // INSERT THE POINT IN THE DESIRED POSITION
                pointsList.Insert(request.Position, p);

                // SWAP THE POINTS DEPENDING ON THE INDEX OF THE LIST
                foreach (var poc in POCS)
                {
                    poc.Position = pointsList.FindIndex(x => x.Value == poc.Id);
                }

                foreach (var poi in POIS)
                {
                    poi.Position = pointsList.FindIndex(x => x.Value == poi.Id);
                }
            }

            await _context.SaveChangesAsync(cancellationToken);
            return POI.Id;
        }
    }

}
