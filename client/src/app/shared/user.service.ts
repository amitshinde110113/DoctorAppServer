import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) {
  }
  // baseUrl = "http://localhost:4000/users/";
  baseUrl =   'https://localdoctorapp.herokuapp.com/users/';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getUsers() {
    return this.httpService.get(this.baseUrl, { headers: this.headers });
  }
}
