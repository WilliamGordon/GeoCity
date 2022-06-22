using geocity.application.Entities.ItinaryPointOfCrossing.Commands.Create;
using geocity.application.Entities.ItinaryPointOfCrossing.Commands.Delete;
using geocity.application.Entities.ItinaryPointOfCrossing.Commands.Update;
using geocity.application.Entities.ItinaryPointOfCrossing.Queries;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class ItinaryPointOfCrossingController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<ItinaryPointOfCrossingDto>> Details(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new GetItinaryPointOfCrossingQuery { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostAsync(CreateItinaryPointOfCrossingCommand command)
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
        public async Task<ActionResult<Guid>> UpdateAsync(UpdateItinaryPointOfCrossingCommand command)
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
        public async Task<ActionResult<Guid>> UpdatePosition(UpdatePositionItinaryPointOfCrossingCommand command)
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

        [HttpDelete("{id}/{modifiedDate}")]
        public async Task<ActionResult> DeleteAsync(Guid id, DateTime modifiedDate)
        {
            try
            {
                return Ok(await Mediator.Send(new DeleteItinaryPointOfCrossingCommand { Id = id, ModifiedDate = modifiedDate }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
