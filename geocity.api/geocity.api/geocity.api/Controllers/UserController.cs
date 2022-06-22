using geocity.application.Entities.User.Commands.Create;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class UserController : ApiControllerBase 
    {
        [HttpPost]
        public async Task<ActionResult<string>> PostAsync(CreateUserCommand command)
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
