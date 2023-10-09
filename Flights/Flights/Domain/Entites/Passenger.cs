namespace Flights.Domain.Entities
{
    public class Passenger
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Gender { get; set; }
        public string Password { get; set; }


        public Passenger(Guid id ,string email, string firstName, string lastName, bool gender, string password)
        {
            this.Id = id;
            this.Email = email;
            this.FirstName = firstName; 
            this.LastName = lastName;   
            this.Gender = gender;
            this.Password = password;
        }
    }
 
}