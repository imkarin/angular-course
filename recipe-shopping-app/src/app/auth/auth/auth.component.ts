import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginMode = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSwitchMode() { // switch from loginMode to registerMode
    this.loginMode = !this.loginMode;
    console.log(this.loginMode);
  }

}
