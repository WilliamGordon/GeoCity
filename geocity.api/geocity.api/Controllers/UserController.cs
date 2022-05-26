using geocity.application.Entities.User.Commands.Create;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class UserController : ApiControllerBase 
    {
        [HttpPost]
        public async Task<ActionResult<string>> PostAsync(CreateUserCommand request)
        {
            return await Mediator.Send(request);
        }
    }
}
