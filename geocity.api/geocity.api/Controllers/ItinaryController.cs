using geocity.application.Entities.Itinary.Commands.Delete;
using geocity.application.Entities.Itinary.Commands.Update;
using geocity.application.Itinary.Commands.CreateItinary;
using geocity.application.Itinary.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class ItinaryController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<ItinaryDto>> Details(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new GetItinaryQuery { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ItinaryDto>> Post(CreateItinaryCommand command)
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
        public async Task<ActionResult<ItinaryDto>> Update(UpdateItinaryCommand command)
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
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            try
            {
                return Ok(await Mediator.Send(new DeleteItinaryCommand { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
