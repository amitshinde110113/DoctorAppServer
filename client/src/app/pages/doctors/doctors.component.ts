import { Component, OnInit } from "@angular/core";
import { DoctorService } from 'src/app/shared/doctor.service';

@Component({
  selector: "app-doctors",
  templateUrl: "doctors.component.html",
  styleUrls: ['./doctors.component.scss']

})
export class DoctorsComponent implements OnInit {
  constructor(private doctorService: DoctorService) { }
  doctors: any = [];
defaultAvatar="assets/img/default-avatar.png";
  ngOnInit() {
    this.getDoctors()
  }
  getDoctors() {
    this.doctorService.getDoctors().subscribe(res => {
      this.doctors = res;
      // console.log(res)
    })
  }
}
