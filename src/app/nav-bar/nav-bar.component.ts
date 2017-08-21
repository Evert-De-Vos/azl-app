import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/common/services';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor( private auth: AuthService) { }

  ngOnInit() {
  }

  isAuthenticated(){
    return this.auth.isAuthenticated();
  }

}
