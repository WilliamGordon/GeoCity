using geocity.application.Entities.TripUserFavorite.Commands.Create;
using geocity.application.Entities.TripUserFavorite.Commands.Delete;
using geocity.application.Entities.TripUserFavorite.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class TripUserFavoriteController : ApiControllerBase
    {
        [HttpGet("{tripId}/{userId}")]
        public async Task<ActionResult<List<TripUserFavoriteDto>>> GetAsync(Guid tripId, string userId)
        {
            try
            {
                return Ok(await Mediator.Send(new GetTripUserFavoriteQuery { TripId = tripId,  UserId = userId }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostAsync(CreateTripUserFavoriteCommand command)
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

        [HttpDelete("{id}")]
        public async Task<ActionResult<Guid>> DelteAsync(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new DeleteTripUserFavoriteCommand { Id = id}));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
