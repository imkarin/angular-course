import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginMode = true;
  loading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() { // switch from loginMode to registerMode
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return; // do this, because users can manually 'enable' the submit button with browser tools
    }

    this.loading = true;
    const email = form.value.email;
    const password = form.value.password;
    // create this for cleaner code below, since the subscribe is the same for both signup and login mode:
    let authObs: Observable<AuthResponseData>; 

    // login request in loginmode
    if (this.loginMode) { 
      authObs = this.authService.logIn(email, password)
    } else { // signup request in registermode
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(
      response => {
        console.log(response)
        this.error = null;
        this.loading = false;
      }, errorMsg => {
        this.error = errorMsg;
        this.loading = false;
      });

    form.reset();
  } 

}
