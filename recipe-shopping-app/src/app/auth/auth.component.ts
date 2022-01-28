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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() { // switch from loginMode to registerMode
    this.loginMode = !this.loginMode;
    console.log(this.loginMode);
  }

  onSubmit(form: NgForm) {
    const formValue = form.value;

    if (this.loginMode) {

    } else {
      this.authService.signUp(formValue.email, formValue.password);
    }
    
    form.reset();
  } 

}
