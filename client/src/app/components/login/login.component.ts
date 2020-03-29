import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(
    private router: Router,
     private fb: FormBuilder,
     private authService:AuthService) { }

  ngOnInit() {
    this.buildForm()
  }
  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    // this.loginForm.valueChanges.subscribe(val=>{
    // console.log(val)
      
    // })
  }
  login() {
    const credentials = this.loginForm.value;
    // console.log(credentials)
    if (credentials.email == '' || credentials.password == '') {
      return;
    } else if (credentials.email == 'amitshinde110113@gmail.com' || credentials.password == 'Amit@1234') {
      this.authService.login()
      this.router.navigate(['/dashboard'])
    }

  }
}
