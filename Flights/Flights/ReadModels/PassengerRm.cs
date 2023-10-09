namespace Flights.ReadModels
{
    public record PassengerRm(
        Guid Id,
        string Email,
        string FirstName,
        string LastName,
        bool Gender);

}