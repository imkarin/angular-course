import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

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
      'username': new FormControl('SuperUser'),
      'email': new FormControl(null), // validation will be added later
      'gender': new FormControl('male')
      // later we will make it clear what kind of controls these are
    });
  }
}
