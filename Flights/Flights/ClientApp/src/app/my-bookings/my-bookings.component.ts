import { Component, OnInit } from '@angular/core';
import { BookingRm, BookDto } from '../api/models';
import { BookingService } from './../api/services/booking.service';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})

export class MyBookingsComponent {
  bookings!: BookingRm[];

  constructor(private bookingService: BookingService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.bookingService.listByIdBooking({ id : this.authService.currentUser?.id ?? '' })
      .subscribe(r => this.bookings = r , this.handleError );
    }

  private handleError = (err: any) => {

    console.log(this.authService.currentUser?.id)
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)

  }

  cancel(booking: BookingRm) {

    const dto: BookDto = {
      flightId: booking.flightId,
      numberOfSeats: booking.numberOfBookedSeats,
      passengerEmail: booking.passengerEmail,
      passengerId: booking.passengerId
    };

    this.bookingService.cancelBooking({ body: dto })
      .subscribe(_ =>
        this.bookings = this.bookings.filter(b => b != booking)
        , this.handleError);


  }
}
