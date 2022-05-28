using geocity.application.DTOs.Composite;
using geocity.application.Cities.Commands.Create;
using geocity.application.Itinary.Commands.CreateItinary;
using geocity.application.Trip.Commands.CreateTrip;
using geocity.application.Trip.Queries;
using geocity.application.TripUser.Commands.Create;
using Microsoft.AspNetCore.Mvc;
using geocity.application.Entities.Trip.Queries;

namespace geocity.api.Controllers
{
    public class TripController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> Details(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new GetTripQuery { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetTripOverview/{link}")]
        public async Task<ActionResult<TripOverviewDto>> GetTripOverview(Guid link)
        {
            return await Mediator.Send(new GetTripOverviewQuery { Link = link });
        }

        //[HttpGet("GetTripsUser/owner/{userid}")]
        //public async Task<ActionResult<List<TripUserDto>>> GetTripsUserOwner(Guid userId)
        //{
        //    return await Mediator.Send(new GetTripsUserOwnerQuery { UserId = userId });
        //}

        //[HttpGet("GetTripsUser/participant/{userid}")]
        //public async Task<ActionResult<List<TripUserDto>>> GetTripsUserParticipant(string userid)
        //{
        //    return await Mediator.Send(new GetTripsUserParticipantQuery { UserId = userid });
        //}

        //[HttpGet("GetTripsUser/favorite/{userid}")]
        //public async Task<ActionResult<List<TripUserDto>>> GetTripsUserFavorite(string userid)
        //{
        //    return await Mediator.Send(new GetTripsUserFavoriteQuery { UserId = userid });
        //}

        [HttpPost]
        public async Task<ActionResult<Guid>> PostAsync(CreateCityTripDto cityTrip)
        {
            try
            {
                // First create the city if not already
                var cityId = await Mediator.Send(new CreateCityCommand
                {
                    Name = cityTrip.CityName,
                    Latitude = cityTrip.Latitude,
                    Longitude = cityTrip.Longitude,
                });

                // Second create the Trip itself
                var tripId = await Mediator.Send(new CreateTripCommand
                {
                    CityId = cityId,
                    Name = cityTrip.TripName,
                    Description = cityTrip.Description,
                    Days = cityTrip.Days,
                });

                // Create the itinaries depending on the number of days selected
                for (int i = 1; i <= cityTrip.Days; i++)
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
                    UserId = cityTrip.UserId,
                    TripId = tripId,
                    IsOwner = true,
                });

                return tripId;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
