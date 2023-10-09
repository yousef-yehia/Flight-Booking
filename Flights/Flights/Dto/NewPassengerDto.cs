using System.ComponentModel.DataAnnotations;
namespace Flights.Dto
{
    public record NewPassengerDto(
        [Required][EmailAddress] string Email,
        [Required] string FirstName,
        [Required] string LastName,
        [Required] bool Gender);
}