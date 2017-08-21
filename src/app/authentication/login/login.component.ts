import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/common/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInvalid: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {

  }

  login(formValues) {
    this.auth
      .loginUser(formValues.userName, formValues.password)
      .subscribe(
        success => { this.router.navigate(['groups']);},
        err => { this.loginInvalid = true;}
      );
  }
}
