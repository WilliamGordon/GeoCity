using geocity.application.Cities.Queries;
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
        
        [HttpGet("{id}")]
        // GET: CityController/Details/5
        public async Task<ActionResult<CityDto>> Details(int id)
        {
            return await Mediator.Send(new GetCityQuery { Id = id });
        }
    }
}
