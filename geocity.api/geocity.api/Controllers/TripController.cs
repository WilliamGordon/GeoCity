using geocity.application.Cities.Commands.CreateCity;
using geocity.application.Composit;
using geocity.application.Itinary.Commands.CreateItinary;
using geocity.application.Trip.Commands.CreateTrip;
using geocity.application.Trip.Queries;
using geocity.application.TripUser.Commands.CreateTripUser;
using geocity.application.TripUser.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class TripController : ApiControllerBase
    {
        // GET: CityController/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> Details(int id)
        {
            return await Mediator.Send(new GetTripQuery { Id = id });
        }

        [HttpGet("GetTripsUser/owner/{userid}")]
        public async Task<ActionResult<List<TripUserDto>>> GetTripsUserOwner(int userid)
        {
            return await Mediator.Send(new GetTripsUserOwnerQuery { UserId = userid });
        }

        [HttpGet("GetTripsUser/participant/{userid}")]
        public async Task<ActionResult<List<TripUserDto>>> GetTripsUserParticipant(int userid)
        {
            return await Mediator.Send(new GetTripsUserParticipantQuery { UserId = userid });
        }

        [HttpGet("GetTripsUser/favorite/{userid}")]
        public async Task<ActionResult<List<TripUserDto>>> GetTripsUserFavorite(int userid)
        {
            return await Mediator.Send(new GetTripsUserFavoriteQuery { UserId = userid });
        }

        [HttpPost]
        public async Task<ActionResult<int>> PostAsync(CreateTripDto tripData)
        {
            // First create the city if not already
            var cityId = await Mediator.Send(new CreateCityCommand 
            { 
                Name = tripData.CityName,
                Latitude = tripData.CityLatitude,
                Longitude = tripData.CityLongitude,
            });

            // Second create the Trip itself
            var tripId = await Mediator.Send(new CreateTripCommand
            {
                CityId = cityId,
                Name = tripData.Name,
                Description = tripData.Description,
                NbDays = tripData.NbDays,
            });

            // Create the itinaries depending on the number of days selected
            for (int i = 1; i <= tripData.NbDays; i++)
            {
                await Mediator.Send(new CreateItinaryCommand
                {
                    TripId = tripId,
                    Day = i,
                });
            }

            // Thirs create the TripUser
            await Mediator.Send(new CreateTripUserCommand
            {
                UserId = tripData.UserId,
                TripId = tripId,
                IsFavorite = false,
                IsParticipant = true,
                IsOwner = true,
            });

            return tripId;
        }
    }
}
