using Auth0.ManagementApi;
using geocity.infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Entities.User.Commands.Create
{
    public class CreateUserCommand : IRequest<string>
    {
        public string Id { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Firstname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, string>
    {
        private readonly GeoCityDbContext _context;

        public CreateUserCommandHandler(GeoCityDbContext context)
        {
            _context = context;
        }

        public async Task<string> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            // check if the user is already registerd in our database
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == request.Id);
            if (user == null)
            {
                try
                {
                    var entity = new geocity.domain.Entities.User();
                    entity.Id = request.Id;
                    entity.Lastname = request.Lastname;
                    entity.Firstname = request.Firstname;
                    entity.Email = request.Email;
                    _context.Users.Add(entity);
                    await _context.SaveChangesAsync(cancellationToken);
                    return entity.Id;
                }
                catch (Exception ex)
                {
                    return user.Id;
                }
            }
            else
            {
                return user.Id;
            }
        }
    }
}
