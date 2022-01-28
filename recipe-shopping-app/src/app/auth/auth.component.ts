import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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

    const email = form.value.email;
    const password = form.value.password;

    if (this.loginMode) { // login request in loginmode

    } else { // signup request in registermode
      this.loading = true;
      this.authService.signUp(email, password).subscribe(response => {
        this.loading = false;
        console.log(response)
      }, error => {
        this.loading = false;
        this.error = 'An error occurred!';
      }
      );
    }

    form.reset();
  } 

}
