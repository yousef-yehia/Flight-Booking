using System.ComponentModel.DataAnnotations;
using Flights.Domain.Entites;
using Flights.ReadModels;

namespace Flights.Dto
{
    public record FlightDto
    (
        // Flight dto
        [Required]string Airline,
        [Required] string Price,
        [Required] TimePlace Departure,
        [Required] TimePlace Arrival,
        [Required] int RemainingNumberOfSeats
    );
}
