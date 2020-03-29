import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpService: HttpClient) {
  }
  // baseUrl = "http://localhost:4000/appointments/";
  baseUrl =   'https://localdoctorapp.herokuapp.com/appointments/';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getAppointments() {
    return this.httpService.get(this.baseUrl, { headers: this.headers });
  }
}
