# Flight Booking System
Welcome to the Flight Booking System! This project allows users to book flights as customers and manage flights as administrators.

## Features
- Customer Functionality:
- Book flights
- Admin Functionality:
- Create, read, update, and delete flights

## Technologies Used
- ASP.NET Core API
- Angular
- Repository Pattern
- AutoMapper
- SQL Server
- Entity Framework Core

## Getting Started
To get started with the Flight Booking System, follow these steps:

- Clone this repository to your local machine.
- Set up your SQL Server database and ensure it's accessible.
- Navigate to the FlightBooking.API directory and run the API project.
- Navigate to the FlightBooking.Client directory and run the Angular project.

## Configuration
API Configuration:
- Configure your database connection string in the appsettings.json file located in the FlightBooking.API project.
- Ensure the necessary migrations are applied to your database using Entity Framework Core.

## Usage
- Customer:
1. Visit the application, browse available flights, and proceed with booking.
- Admin:
1. Access admin privileges by logging in with appropriate credentials.
2. Once logged in, you can create, view, update, and delete flights as needed.
