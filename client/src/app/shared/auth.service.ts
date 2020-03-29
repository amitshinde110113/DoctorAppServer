import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor() {

  }
  logout() {
    this.isLoggedIn = false;
  }
  login() {
    this.isLoggedIn = true;
  }
  isAuthenticated(){
    // console.log(this.isLoggedIn)
    return this.isLoggedIn;
  }
}
