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
    }
}
