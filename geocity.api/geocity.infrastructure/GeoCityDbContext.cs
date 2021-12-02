using geocity.domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace geocity.infrastructure
{
    public class GeoCityDbContext : DbContext
    {
        public GeoCityDbContext(DbContextOptions<GeoCityDbContext> options) : base(options) {}
        public DbSet<City> Cities { get; set; }
        public DbSet<Coordinate> Coordinates { get; set; }
        public DbSet<Itinary> Itinaries { get; set; }
        public DbSet<ItinaryPlace> ItinaryPlaces { get; set; }
        public DbSet<ItinaryUser> ItinaryUsers { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ItinaryPlace>()
                .HasKey(bc => new { bc.ItinaryId, bc.PlaceId });
            modelBuilder.Entity<ItinaryPlace>()
                .HasOne(bc => bc.Itinary)
                .WithMany(b => b.ItinaryPlaces)
                .HasForeignKey(bc => bc.ItinaryId);
            modelBuilder.Entity<ItinaryPlace>()
                .HasOne(bc => bc.Place)
                .WithMany(c => c.ItinaryPlaces)
                .HasForeignKey(bc => bc.PlaceId);

            modelBuilder.Entity<ItinaryUser>()
                .HasKey(bc => new { bc.ItinaryId, bc.UserId });
            modelBuilder.Entity<ItinaryUser>()
                .HasOne(bc => bc.Itinary)
                .WithMany(b => b.ItinaryUsers)
                .HasForeignKey(bc => bc.ItinaryId);
            modelBuilder.Entity<ItinaryUser>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.ItinaryUsers)
                .HasForeignKey(bc => bc.UserId);
        }
    }
}
