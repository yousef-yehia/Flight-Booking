using Flights.Domain.Entites;
using Flights.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Flights.Data
{
    public class Entities : DbContext
    {
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<Flight> Flights { get; set; }

        public Entities(DbContextOptions<Entities> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Passenger>().HasKey(p => p.Id);

            modelBuilder.Entity<Flight>().Property(p => p.RemainingNumberOfSeats).IsConcurrencyToken();


            modelBuilder.Entity<Flight>().OwnsOne(f => f.Departure);
            modelBuilder.Entity<Flight>().OwnsOne(f => f.Arrival);
            modelBuilder.Entity<Flight>().OwnsMany(f => f.Bookings);

        }
    }
}