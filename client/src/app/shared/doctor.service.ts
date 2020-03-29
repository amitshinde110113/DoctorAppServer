import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private httpService: HttpClient) {
  }
  // baseUrl = "http://localhost:4000/doctors/";
  baseUrl =   'https://localdoctorapp.herokuapp.com/doctors/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  //  if (environment.production) {
  //   enableProdMode();

  // }
  getDoctors() {
    return this.httpService.get(this.baseUrl + 'get', { headers: this.headers });
  }
}
