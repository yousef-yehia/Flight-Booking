import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from './../api/services/flight.service';
import { PassengerService } from './../api/services/passenger.service';

import { BookDto, FlightRm } from '../api/models';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  id!: string;
    
  constructor(private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  flightId: string = 'not loaded'
  flight: FlightRm = {}
  notEnoughSeats: boolean = false;

  form = this.formBuilder.group({
    number: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(50)] )]
  })

  ngOnInit(): void {

    this.route.paramMap
      .subscribe(p => this.findFlight(p.get("flightId")))
  }

  private findFlight = (flightId: string | null) => {
    this.flightId = flightId ?? 'not passed';

    this.flightService.findFlight({ id: this.flightId })
      .subscribe(flight => this.flight = flight,
        this.handleError)
  }

  private handleError = (err: any) => {

    if (err.status == 404) {
      alert("Flight not found!")
      this.router.navigate(['/search-flights'])
    }

    if (err.status == 409) {
      console.log("err: " + err);
      //alert(JSON.parse(err.error).message);
      return this.notEnoughSeats = true
    }

    console.log(this.authService.currentUser?.id)
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)

    return null
  }

  book() {

    if (this.form.invalid) {
      return;
    }

    const booking: BookDto = {
      flightId: this.flight.id,
      passengerEmail: this.authService.currentUser?.email,
      passengerId: this.authService.currentUser?.id,
      numberOfSeats: this.form.get('number')?.value as number,

    }

    this.flightService.bookFlight({ body: booking })
      .subscribe(_ => this.router.navigate(['/my-booking']),
        this.handleError)  }

  get number() {
    return this.form.controls.number
  }

}


