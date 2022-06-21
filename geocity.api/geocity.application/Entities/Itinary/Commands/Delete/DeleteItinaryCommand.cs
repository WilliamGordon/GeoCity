using AutoMapper;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.Itinary.Commands.Delete
{
    public class DeleteItinaryCommand: IRequest
    {
        public Guid Id { get; set; }
    }

    public class DeleteItinaryCommandHandler : IRequestHandler<DeleteItinaryCommand>
    {
        private readonly GeoCityDbContext _context;
        private readonly IMapper _mapper;

        public DeleteItinaryCommandHandler(IMediator mediator, GeoCityDbContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper;
        }

        public async Task<Unit> Handle(DeleteItinaryCommand request, CancellationToken cancellationToken)
        {
            var itinary = _context.Itinaries.Where(x => x.Id == request.Id).Include(x => x.Trip).SingleOrDefault();

            // REMOVE ITINARY FROM DB
            _context.Itinaries.Remove(itinary);
            
            // REARANGE THE DAY/POSITION OF ITINARIES 
            var itinaries = _context.Itinaries.Where(x => x.Trip.Id == itinary.Trip.Id).ToList();

            // REMOVE ITINARY FROM LIST (We didn't made a save change yet)
            itinaries.Remove(itinary);

            // CREATE DICTIONNARY
            List<KeyValuePair<int, Guid>>? itinaryList = new List<KeyValuePair<int, Guid>>();

            // STORE THE ITINARIES IN DICTIONNARY
            foreach (var poc in itinaries)
            {
                KeyValuePair<int, Guid> pItem = new KeyValuePair<int, Guid>(poc.Day, poc.Id);
                itinaryList.Add(pItem);
            }

            // SORT THE LIST
            itinaryList = itinaryList.OrderBy(x => x.Key).ToList();

            // SWAP THE ITINARY DEPENDING ON THE INDEX OF THE LIST
            foreach (var itin in itinaries)
            {
                itin.Day = itinaryList.FindIndex(x => x.Value == itin.Id) + 1;
            }

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
