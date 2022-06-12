using geocity.application.Entities.PointOfInterest.Commands.Create;
using geocity.application.Entities.PointOfInterest.Commands.Update;
using geocity.application.Entities.PointOfInterest.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class PointOfInterestController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<PointOfInterestDto>> Details(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new GetAllPointOfInterestsQuery { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetPointOfInterest/{id}")]
        public async Task<ActionResult<PointOfInterestDto>> GetPointOfInterest(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new GetPointOfInterestQuery { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostAsync(CreatePointOfInterestCommand command)
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
        public async Task<ActionResult<PointOfInterestDto>> Update(UpdatePointOfInterestCommand command)
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
