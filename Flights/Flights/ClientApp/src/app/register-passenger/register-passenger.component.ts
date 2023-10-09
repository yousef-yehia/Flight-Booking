import { Component, OnInit } from '@angular/core';
import { PassengerService } from './../api/services/passenger.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {
  formSubmitted = false;
  passengerId : string | undefined;
  emailUsed: boolean = false;

  constructor(private passengerService: PassengerService, private formBuilder: FormBuilder, private authService: AuthService,
     private router: Router) { }

  form = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(100)])],
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(35)])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(35)])],
    isFemale: [, Validators.required],
    password: [, Validators.required],
    confirmPassword: [, Validators.required]

  }, {
    validators: this.passwordMatchValidator // Add this line for custom validation
  });


  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      console.log('no');

    }
    return password === confirmPassword ? null : { mismatch: true };
  }


  ngOnInit(): void {
  }

  checkPassenger(): void {
    const params = { email: this.form.get('email')?.value as string }

    this.passengerService
      .findPassenger(params)
      .subscribe(
        this.handleError, e => {
          if (e.status != 404)
            console.error(e)
          this.emailUsed=false
        }
      )
  }
  onSubmit() {
    this.formSubmitted = true;

    if (this.form.valid) {
      // Perform your registration logic here
      console.log('Form submitted successfully');
    }
  }

  private handleError = (err: any) => {

    this.emailUsed = true
    console.log("Response Error. Statsssus: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

  register() {
    if (this.form.invalid) {
      return;
    }

    console.log("Form Values:", this.form.value);

    this.passengerService.registerPassenger({ body: this.form.value })
      .subscribe(this.login, console.error)

  }

  private login = () => {
    const email = this.form.get('email')?.value as string;

    this.passengerService.getPassengerIdByEmailPassenger({ email })
      .subscribe(id => {
        this.handleSuccessfulLogin(id);
      }, error => {
        console.error('Error getting passengerId:', error);
      });
  }

  private handleSuccessfulLogin(passengerId: string) {
    this.passengerId = passengerId;
    console.log("id Values:", this.passengerId);

    this.authService.loginUser({
      email: this.form.get('email')?.value as string,
      id: this.passengerId as string
    });

    this.router.navigate(['/search-flight']);
  }
}
