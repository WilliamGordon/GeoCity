using geocity.application.Entities.TripUser.Queries;
using geocity.application.TripUser.Commands.Create;
using geocity.application.TripUser.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class TripUserController : ApiControllerBase
    {
        [HttpGet("{userId}/{tripId}")]
        public async Task<ActionResult<List<TripUserDto>>> Details(string userId, Guid tripId)
        {
            try
            {
                return Ok(await Mediator.Send(new GetTripUserQuery { UserId = userId, TripId = tripId}));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<TripUserDto>>> Details(string userId)
        {
            try
            {
                return Ok(await Mediator.Send(new GetAllTripUserQuery { UserId = userId }));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostAsync(CreateTripUserCommand command)
        {
            try
            {
                return Ok(await Mediator.Send(command));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
