import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }

  onSigneIn() {
    this.authService.signeIn().then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.route.navigate(['appareils']);
      }
    );
  }

  onSigneOut() {
    this.authService.signeOut();
    this.authStatus = this.authService.isAuth;
  }
}
