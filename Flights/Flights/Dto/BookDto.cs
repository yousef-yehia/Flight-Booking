using System.ComponentModel.DataAnnotations;

namespace Flights.Dto
{
    public record BookDto(
        [Required] Guid FlightId,
        [Required][EmailAddress] string PassengerEmail,
        [Required] Guid PassengerId,
        [Required][Range(1,20)] byte NumberOfSeats);

}