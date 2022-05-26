using geocity.application.Cities.Commands.Create;
using geocity.application.City.Queries;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class CityController : ApiControllerBase
    {
        // GET: CityController
        [HttpGet]
        public async Task<ActionResult<List<CityDto>>> Index()
        {
            return await Mediator.Send(new GetCitiesQuery());
        }
        
        // GET: CityController/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CityDto>> Details(Guid id)
        {
            return await Mediator.Send(new GetCityQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> PostAsync(CreateCityCommand city)
        {
            // First create the city if not already
            var cityId = await Mediator.Send(new CreateCityCommand
            {
                Name = city.Name,
                Latitude = city.Latitude,
                Longitude = city.Longitude,
            });
            return Ok(cityId);
        }
    }
}
