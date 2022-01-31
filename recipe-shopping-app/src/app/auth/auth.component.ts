import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginMode = true;
  loading = false;
  // error: string = null; // you don't need this global error with this approach

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {}

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
        // this.error = null;
        this.loading = false;

        // navigate to recipes page:
        this.router.navigate(['/recipes'])
      },
      errorMsg => {
        // this.error = errorMsg;
        // show dynamic component:
        this.showErrorAlert(errorMsg);

        this.loading = false;
      }
    );

    form.reset();
  }

  private showErrorAlert(message: string) {
    // this method will return an AlertComponent-factory:
    this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // you can use the factory to create a complete component
    // you also need to tell angular where to add this component (angular needs a viewcontainer ref)
    

  }

}
