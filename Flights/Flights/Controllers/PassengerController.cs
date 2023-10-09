using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Flights.Dto;
using Flights.ReadModels;
using Flights.Domain.Entities;
using Flights.Data;

namespace Flights.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        private readonly Entities _entities;

        public PassengerController(Entities entities)
        {
            _entities = entities;
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(Passenger passenger)
        {
            if (_entities.Passengers.Any(p => p.Email == passenger.Email))
            {
                return BadRequest();
            }
            _entities.Passengers.Add( new Passenger(Guid.NewGuid(), passenger.Email, passenger.FirstName, passenger.LastName, passenger.Gender, passenger.Password) );
            _entities.SaveChanges();


            return CreatedAtAction(nameof(Find), new { email = passenger.Email });
        }

        [HttpGet("{email}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<Passenger> Find(string email)
        {
            var passenger = _entities.Passengers.FirstOrDefault(p => p.Email == email);

            if (passenger == null)
                return NotFound("Passenger not found for the specified email.");

            var prm = new Passenger(
                passenger.Id,
                passenger.Email,
                passenger.FirstName,
                passenger.LastName,
                passenger.Gender,
                passenger.Password
                );

            return Ok(prm);
        }


        [HttpGet("getPassengerId/{email}")]  
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public Guid getPassengerIdByEmail(string email)
        {
            var passenger = _entities.Passengers.SingleOrDefault(x => x.Email == email);
            if ( passenger == null)
            {
                return Guid.Empty;
            }
            return passenger.Id;

        }

        [HttpGet("{email}/{password}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<Passenger> CheckPassenger(string email, string password)
        {
            var passenger = _entities.Passengers.FirstOrDefault(p => p.Email == email && p.Password == password);

            if (passenger == null)
                return NotFound("Passenger not found for the specified email.");

            var prm = new Passenger(
                passenger.Id,
                passenger.Email,
                passenger.FirstName,
                passenger.LastName,
                passenger.Gender,
                passenger.Password
                );

            return Ok(prm);
        }
    }
}
