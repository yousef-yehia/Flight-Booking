using Flights.Domain.Errors;
using Flights.ReadModels;

namespace Flights.Domain.Entites
{
    public class Flight
    {
        public Guid Id { get; set; }
        public string Airline { get; set; }
        public string Price { get; set; }
        public TimePlace Departure { get; set; }
        public TimePlace Arrival { get; set; }
        public int RemainingNumberOfSeats { get; set; }

        public IList<Booking> Bookings = new List<Booking>();

        public Flight()
        {
        }

        public Flight( Guid id, string airline, string price, TimePlace departure, TimePlace arrival, int remainingNumberOfSeats)
        {
            Id = id;
            Airline = airline;
            Price = price;
            Departure = departure;
            Arrival = arrival;
            RemainingNumberOfSeats = remainingNumberOfSeats;
        }

        public string MakeBooking(Guid PassengerId, string passengerEmail, byte numberOfSeats)
        {
            if (this.RemainingNumberOfSeats < numberOfSeats)
            {
                return "conflict" ;
            }

            this.Bookings.Add(new Booking(PassengerId, passengerEmail, numberOfSeats));

            this.RemainingNumberOfSeats -= numberOfSeats;

            return null;
        }

        public object? CancelBooking(Guid passengerId, byte numberOfSeats)
        {
            var booking = Bookings.FirstOrDefault(b => numberOfSeats == b.NumberOfSeats
           && passengerId == b.PassengerId );

            if (booking == null)
                return new NotFoundError();

            Bookings.Remove(booking);
            RemainingNumberOfSeats += booking.NumberOfSeats;

            return null;
        }

    }

}
