using geocity.application.Entities.ItinaryPointOfInterest.Commands.Create;
using geocity.application.Entities.ItinaryPointOfInterest.Commands.Delete;
using geocity.application.Entities.ItinaryPointOfInterest.Commands.Update;
using geocity.application.Entities.ItinaryPointOfInterest.Queries;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class ItinaryPointOfInterestController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<ItinaryPointOfInterestDto>> Details(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new GetItinaryPointOfInterestQuery { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostAsync(CreateItinaryPointOfInterestCommand command)
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

        [HttpPost("AddSuggestion")]
        public async Task<ActionResult<Guid>> AddSuggestion(CreateItinaryPointOfInterestFromSuggestionCommand command)
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
        public async Task<ActionResult<Guid>> UpdateAsync(UpdateItinaryPointOfInterestCommand command)
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

        [HttpPut("UpdatePosition")]
        public async Task<ActionResult<Guid>> UpdatePosition(UpdatePositionItinaryPointOfInterestCommand command)
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
        public async Task<ActionResult> DeleteAsync(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new DeleteItinaryPointOfInterestCommand { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
