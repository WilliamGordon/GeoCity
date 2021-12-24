using geocity.domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace geocity.infrastructure
{
    public class GeoCityDbContext : DbContext
    {
        public GeoCityDbContext(DbContextOptions<GeoCityDbContext> options) : base(options) {}
        public DbSet<City> Cities { get; set; }
        public DbSet<Itinary> Itinaries { get; set; }
        public DbSet<ItinaryPlace> ItinaryPlaces { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripUser> TripUsers { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>()
                .HasMany(c => c.Trips)
                .WithOne(e => e.City);

            modelBuilder.Entity<Trip>()
               .HasMany(c => c.Itinaries)
               .WithOne(e => e.Trip);

            modelBuilder.Entity<ItinaryPlace>()
                .HasKey(bc => bc.Id);
            modelBuilder.Entity<ItinaryPlace>()
               .Property(bc => bc.Id)
               .ValueGeneratedOnAdd();
            modelBuilder.Entity<ItinaryPlace>()
                .HasOne(bc => bc.Itinary)
                .WithMany(b => b.ItinaryPlaces)
                .HasForeignKey(bc => bc.ItinaryId);
            modelBuilder.Entity<ItinaryPlace>()
                .HasOne(bc => bc.Place)
                .WithMany(c => c.ItinaryPlaces)
                .HasForeignKey(bc => bc.PlaceId);

            modelBuilder.Entity<TripUser>()
                .HasKey(bc => bc.Id);
            modelBuilder.Entity<TripUser>()
               .Property(bc => bc.Id)
               .ValueGeneratedOnAdd();
            modelBuilder.Entity<TripUser>()
                .HasOne(bc => bc.Trip)
                .WithMany(b => b.TripUsers)
                .HasForeignKey(bc => bc.TripId);
            modelBuilder.Entity<TripUser>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.TripUsers)
                .HasForeignKey(bc => bc.UserId);
        }
    }
}
