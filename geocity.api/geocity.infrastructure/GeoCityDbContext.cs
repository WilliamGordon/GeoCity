using geocity.domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace geocity.infrastructure
{
    public class GeoCityDbContext : DbContext
    {
        public DbSet<City> Cities { get; set; }

        public GeoCityDbContext(DbContextOptions<GeoCityDbContext> options) : base(options) {}
    }
}
