import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Rest/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  Username = "";
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }
  onSignIn() {
    this.authService.signIn(this.Username);
  }
  onRegister() {
    localStorage.clear();
    this.authService.signIn('nagesh');
    this.route.navigate(['/register']);
  }
}
