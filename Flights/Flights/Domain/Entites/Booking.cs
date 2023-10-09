namespace Flights.Domain.Entites
{
    public record Booking(Guid PassengerId, string PassengerEmail, byte NumberOfSeats);
    
}
