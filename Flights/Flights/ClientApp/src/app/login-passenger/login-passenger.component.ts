import { Component, OnInit } from '@angular/core';
import { PassengerService } from './../api/services/passenger.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-passenger',
  templateUrl: './login-passenger.component.html',
  styleUrls: ['./login-passenger.component.css']
})
export class LoginPassengerComponent implements OnInit {
  formSubmitted = false;
  passengerId: string | undefined;
  emailUsed: boolean = true;
  passwordMatch: boolean = false; 
  constructor(private passengerService: PassengerService, private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router, private activatedRoute: ActivatedRoute) { }


  requestedUrl?: string = undefined

  form = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(100)])],
    password: [, Validators.required],
  })


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => this.requestedUrl = p['requestedUrl'])
  }


  checkPassenger(): void {
    const emailParam = { email: this.form.get('email')?.value as string }
    this.passengerService
      .findPassenger(emailParam )
      .subscribe
      (
        a => { this.emailUsed = true }
        , e => {
          if (e.status != 404)
            console.error(e)
          this.emailUsed = false
        }
    )


  }

  checkPassword(): void {
    console.log("a6a")
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.valid && this.emailUsed == true && this.passwordMatch == true ) {
      // Perform your registration logic here
      console.log('Form submitted successfully');
    }
  }

  login = () => {

    const email = this.form.get('email')?.value as string
    const passwrd = this.form.get('password')?.value as unknown as string

    const params = { email: email, password: passwrd }
    console.log(params.email, params.password)
    this.passengerService.checkPassengerPassenger(params).subscribe(
      a => {
        this.passwordMatch = true;
        console.log(this.passwordMatch)
        console.log(a.password, a.email);
      }
      ,
      e => {
        if (e.status != 404)
          console.error(e)
        console.log("askbuadakb")
        this.passwordMatch = false;
      })





  }

   handleLogin() {
    if (this.form.invalid || this.emailUsed == false || this.passwordMatch == false) {
      return;
    }
    const email = this.form.get('email')?.value as string
    this.passengerService.getPassengerIdByEmailPassenger({ email })
      .subscribe(id => {
        this.passengerId = id,
        this.currentUser();
        this.router.navigate([this.requestedUrl ?? '/search-flight']);

      }, error => {
        console.error('Error getting passengerId:', error);
      });

  }

  currentUser(): void {
    console.log("id Values:", this.passengerId);

    this.authService.loginUser({
      email: this.form.get('email')?.value as string,
      id: this.passengerId as string
    });
  }
}


