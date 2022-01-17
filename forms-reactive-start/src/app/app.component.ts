import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
  signupForm: FormGroup; // in angular, a form = just a group of controls

  ngOnInit() {
    this.signupForm = new FormGroup({
      // you add controls here in key-value pairs
      'userData': new FormGroup({
        'username': new FormControl('SuperUser', Validators.required), 
        'email': new FormControl(null, [Validators.required, Validators.email]), // you can also add an array of validators
      }),
      'gender': new FormControl('male')
    });
  }

  onSubmit() { // we don't need a localreference to the form in html, 
               // we already have it as a variable in this code
    console.log(this.signupForm);
  }
}
