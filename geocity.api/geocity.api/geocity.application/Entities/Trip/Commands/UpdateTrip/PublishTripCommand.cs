using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.Trip.Commands.UpdateTrip
{
    public class PublishTripCommand : IRequest<Guid>
    {
        public Guid TripId { get; set; }
        public string UserId { get; set; }
    }

    public class PublishTripCommandHandler : IRequestHandler<PublishTripCommand, Guid>
    {
        private readonly IMediator _mediator;
        private readonly GeoCityDbContext _context;
        public PublishTripCommandHandler(IMediator mediator, GeoCityDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public async Task<Guid> Handle(PublishTripCommand request, CancellationToken cancellationToken)
        {
            // TODO : CHECK IF USER IS OWNER
            try
            {
                var trip = await _context.Trips.FindAsync(request.TripId);
                if (trip.IsPublished)
                {
                    trip.IsPublished = false;
                }
                else
                {
                    CheckIfUserIsOwnerOfTheTrip(request);
                    CheckIfAllRouteHaveBeenGenerated(request);
                    CheckIfAllItinariesHaveAtLeastTheePoints(request);
                    checkIfAPointWasModifiedAfterTheRouteWasGenerated(request);

                    trip.IsPublished = true;
                }
                
                await _context.SaveChangesAsync(cancellationToken);
                return trip.Id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CheckIfUserIsOwnerOfTheTrip(PublishTripCommand request)
        {
            var tripUser = _context.TripUsers
                .SingleOrDefault(x => x.UserId == request.UserId && x.TripId == request.TripId);

            if (tripUser.IsOwner == false)
            {
                throw new Exception("You're not the owner of this trip. Only the owner can publish a trip !");
            }
        }

        public void CheckIfAllRouteHaveBeenGenerated(PublishTripCommand request)
        {
            // GET ALL ITINARIES FOR TRIP AND CHECK IF THEY HAVE A DISTANCE
            var itinaries = _context.Itinaries.Where(x => x.TripId == request.TripId).ToList();

            foreach (var itinary in itinaries)
            {
                if (itinary.Distance == 0 || itinary.Distance == null)
                {
                    throw new Exception("All the route for the itinaries have not been generated.");
                }
            }
        }

        public void CheckIfAllItinariesHaveAtLeastTheePoints(PublishTripCommand request)
        {
            var itinaries = _context.Itinaries.Where(x => x.TripId == request.TripId).Include(x => x.ItinaryPointOfCrossing).Include(x => x.ItinaryPointOfInterest).ToList();

            foreach (var itinary in itinaries)
            {
                var nbPoints = itinary.ItinaryPointOfInterest.Count + itinary.ItinaryPointOfCrossing.Count;

                if (nbPoints < 3)
                {
                    throw new Exception("You should have at least 3 points in each of the itinaries of the trip before publishing it");
                }
            }
        }

        public void checkIfAPointWasModifiedAfterTheRouteWasGenerated(PublishTripCommand request)
        {
            var itinaries = _context.Itinaries.Where(x => x.TripId == request.TripId).Include(x => x.ItinaryPointOfCrossing).Include(x => x.ItinaryPointOfInterest).ToList();

            foreach (var itinary in itinaries)
            {
                var oldestPoi = GetOlderPointOfInterestOfItinary(itinary);
                var oldestPoc = GetOlderPointOfCrossingOfItinary(itinary);
                if (oldestPoi.ModifiedDate > itinary.ModifiedDate || oldestPoc.ModifiedDate > itinary.ModifiedDate)
                {
                    throw new Exception("Please re-generate the itinary after making a modification to one of it's points");
                }
            }
        }

        public geocity.domain.Entities.ItinaryPointOfInterest GetOlderPointOfInterestOfItinary(geocity.domain.Entities.Itinary itinary)
        {
            geocity.domain.Entities.ItinaryPointOfInterest lastModifiedPoi = new domain.Entities.ItinaryPointOfInterest();

            foreach (var poi in itinary.ItinaryPointOfInterest)
            {
                if (lastModifiedPoi.ModifiedDate == null)
                {
                    lastModifiedPoi = poi;
                } 
                else
                {
                    if (poi.ModifiedDate > lastModifiedPoi.ModifiedDate)
                    {
                        lastModifiedPoi = poi;
                    }
                }
            }
            return lastModifiedPoi;
        }

        public geocity.domain.Entities.ItinaryPointOfCrossing GetOlderPointOfCrossingOfItinary(geocity.domain.Entities.Itinary itinary)
        {
            geocity.domain.Entities.ItinaryPointOfCrossing lastModifiedPoc = new domain.Entities.ItinaryPointOfCrossing();

            foreach (var poi in itinary.ItinaryPointOfCrossing)
            {
                if (lastModifiedPoc.ModifiedDate == null)
                {
                    lastModifiedPoc = poi;
                }
                else
                {
                    if (poi.ModifiedDate > lastModifiedPoc.ModifiedDate)
                    {
                        lastModifiedPoc = poi;
                    }
                }
            }
            return lastModifiedPoc;
        }
    }
}
