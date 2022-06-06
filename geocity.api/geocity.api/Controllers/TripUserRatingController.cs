using geocity.application.Entities.TripUserRating.Commands;
using geocity.application.Entities.TripUserRating.Commands.Update;
using geocity.application.Entities.TripUserRating.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class TripUserRatingController : ApiControllerBase
    {
        [HttpGet("{tripId}/{userId}")]
        public async Task<ActionResult<List<TripUserRatingDto>>> GetAsync(Guid tripId, string userId)
        {
            try
            {
                return Ok(await Mediator.Send(new GetTripUserRatingQuery { TripId = tripId, UserId = userId }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostAsync(CreateTripUserRatingCommand command)
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

        [HttpPut]
        public async Task<ActionResult<Guid>> UpdateAsync(UpdateTripUserRatingCommand command)
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
