using geocity.application.Cities.Commands.Create;
using geocity.application.City.Queries;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class CityController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<CityDto>>> Index()
        {
            try
            {
                return Ok(await Mediator.Send(new GetCitiesQuery()));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<CityDto>> Details(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new GetCityQuery { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostAsync(CreateCityCommand city)
        {
            try
            {
                return Ok(await Mediator.Send(city));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
