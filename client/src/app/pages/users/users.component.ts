import { Component, OnInit } from "@angular/core";
import { UserService } from 'src/app/shared/user.service';

declare const google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

@Component({
  selector: "app-map",
  templateUrl: "users.component.html",
  styleUrls: ['./users.component.scss']

})
export class UsersComponent implements OnInit {
defaultAvatar="assets/img/default-avatar.png";

  constructor(private userService: UserService) { }
  users: any = [];
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe(users => {
      // console.log(users)
      this.users = users;

    })
  }
}
