﻿// <auto-generated />
using System;
using Flights.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Flights.Migrations
{
    [DbContext(typeof(Entities))]
    partial class EntitiesModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Flights.Domain.Entites.Flight", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Airline")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Price")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RemainingNumberOfSeats")
                        .IsConcurrencyToken()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("Flights.Domain.Entities.Passenger", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Gender")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Passengers");
                });

            modelBuilder.Entity("Flights.Domain.Entites.Flight", b =>
                {
                    b.OwnsMany("Flights.Domain.Entites.Booking", "Bookings", b1 =>
                        {
                            b1.Property<Guid>("FlightId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            SqlServerPropertyBuilderExtensions.UseIdentityColumn(b1.Property<int>("Id"));

                            b1.Property<byte>("NumberOfSeats")
                                .HasColumnType("tinyint");

                            b1.Property<string>("PassengerEmail")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<Guid>("PassengerId")
                                .HasColumnType("uniqueidentifier");

                            b1.HasKey("FlightId", "Id");

                            b1.ToTable("Booking");

                            b1.WithOwner()
                                .HasForeignKey("FlightId");
                        });

                    b.OwnsOne("Flights.Domain.Entites.TimePlace", "Arrival", b1 =>
                        {
                            b1.Property<Guid>("FlightId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("Place")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<DateTime>("Time")
                                .HasColumnType("datetime2");

                            b1.HasKey("FlightId");

                            b1.ToTable("Flights");

                            b1.WithOwner()
                                .HasForeignKey("FlightId");
                        });

                    b.OwnsOne("Flights.Domain.Entites.TimePlace", "Departure", b1 =>
                        {
                            b1.Property<Guid>("FlightId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("Place")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<DateTime>("Time")
                                .HasColumnType("datetime2");

                            b1.HasKey("FlightId");

                            b1.ToTable("Flights");

                            b1.WithOwner()
                                .HasForeignKey("FlightId");
                        });

                    b.Navigation("Arrival")
                        .IsRequired();

                    b.Navigation("Bookings");

                    b.Navigation("Departure")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
