import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import {
  AuthService
} from 'app/common/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  matchingNewPasswords: boolean = true;
  matchingUserPasswords: boolean = true;

  newPassMessage: string;
  userMessage: string;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  changePassword(form: FormControl) {
    let values = form.value;
    if (values.newPass !== values.repeatPass) {
      this.matchingNewPasswords = false;
      return;
    }

    this.matchingNewPasswords = true;
    this.authService
      .changePassword(values.oldPass, values.newPass)
      .subscribe(
      success => { this.newPassMessage = success.message },
      error => { this.newPassMessage = error.message }
      );

    form.reset();
  }

  registerUser(form: FormControl) {
    let values = form.value;
    if (values.password !== values.repeatPassword) {
      this.matchingUserPasswords = false
      return;
    }

    this.matchingUserPasswords = true;

    this.authService
      .register(values.username, values.email, values.password)
      .subscribe(
      success => { this.userMessage = success.message },
      error => { this.userMessage = error.message }
      );

    form.reset();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/user/login']);
  }
}
