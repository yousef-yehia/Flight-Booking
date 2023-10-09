import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser?: User;

  loginUser(user: User) {
    console.log("Log in the user with email and id " + user.email + user.id)
    this.currentUser = user
  }
}

interface User {
  email: string
  id: string
}
