import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  loginMode = true;
  loading = false;
  // error: string = null; // you don't need this global error with this approach
  @ViewChild(PlaceholderDirective) alertHost; // you can pass a type to viewchild, it will look for the first place where this type (this directive) is used
  private closeAlertSub: Subscription;

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
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // you can use the factory to create a complete component
    // we will place the component in the ng-template with the appPlaceholder directive
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // make sure there's no components in it already
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    // access the concrete instance of the component we created
    componentRef.instance.message = message;
    this.closeAlertSub = componentRef.instance.closeAlert.subscribe(() => { // this is the only exception, where subscribing to an EventEmitter is OK
      this.closeAlertSub.unsubscribe(); // cleans itself up immediately after being clicked/closed
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if (this.closeAlertSub) { // clean up subscription in case we leave the component without clicking 'close'
      this.closeAlertSub.unsubscribe();
    }
  }

}
