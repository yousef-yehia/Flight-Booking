using Flights.Dto;
using Flights.ReadModels;
using Flights.Domain.Entites;
using Microsoft.AspNetCore.Mvc;
using Flights.Data;
using Microsoft.EntityFrameworkCore;
using Flights.Dtos;

namespace Flights.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlightController : ControllerBase
    {
        private readonly ILogger<FlightController> _logger;
        private readonly Entities _entities;


        public FlightController(ILogger<FlightController> logger,
            Entities entities)
        {
            _logger = logger;
            _entities = entities;
        }


        static Random random = new Random();

        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(IEnumerable<FlightRm>), 200)]
        public IEnumerable<FlightRm> Search([FromQuery]FlightSearchParmsDto prms)
        {
            IQueryable<Flight> flights = _entities.Flights;

            if (!string.IsNullOrWhiteSpace(prms.Destination))
                flights = flights.Where(f => f.Arrival.Place.Contains(prms.Destination));

            if (!string.IsNullOrWhiteSpace(prms.From))
                flights = flights.Where(f => f.Departure.Place.Contains(prms.From));

            if (prms.FromDate != null)
                flights = flights.Where(f => f.Departure.Time >= prms.FromDate.Value.Date);

            if (prms.ToDate != null)
                flights = flights.Where(f => f.Departure.Time >= prms.ToDate.Value.Date.AddDays(1).AddTicks(-1));

            if (prms.NumberOfPassengers != 0 && prms.NumberOfPassengers != null)
                flights = flights.Where(f => f.RemainingNumberOfSeats >= prms.NumberOfPassengers);
            else
                flights = flights.Where(f => f.RemainingNumberOfSeats >= 1);

            var flightRmList = flights.Select(flight => new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats
                ));

            return flightRmList;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(FlightRm))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]

        public ActionResult<FlightRm> Find(Guid id)
        {

            var flight = _entities.Flights.SingleOrDefault(f => f.Id == id);
            if (flight == null)
            {
                return NotFound();
            }
            var readModel = new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats
                );

            return Ok(readModel);
        }

        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(201)]
        public IActionResult Book(BookDto dto)
        {
            System.Diagnostics.Debug.WriteLine($"Booking a new flight {dto.FlightId}");

            var flight = _entities.Flights.SingleOrDefault(f => f.Id == dto.FlightId);

            if (flight == null)
                return NotFound();

            var error = flight.MakeBooking(dto.PassengerId, dto.PassengerEmail, dto.NumberOfSeats);

            if (error == "conflict")
                return Conflict(new { message = "Not enough seats." });


            try
            {
                _entities.SaveChanges();

            }
            catch (DbUpdateConcurrencyException)
            {

                return Conflict(new { message = "Not enough seats." });
            }
            return CreatedAtAction(nameof(Find), new { id = dto.FlightId });
        }

    }
}