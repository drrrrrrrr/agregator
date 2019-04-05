import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = false;
  userEmail: string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.checkAuth().subscribe(data => {
      if (data) {
        this.userEmail = data['email'];
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  logOff() {
    this.auth.logOff().subscribe(data => {
       this.isLogin = false;
    });
  }

}
