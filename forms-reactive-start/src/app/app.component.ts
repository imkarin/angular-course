import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]) // array of form-controls
    });
  }

  onSubmit() { // we don't need a localreference to the form in html, 
               // we already have it as a variable in this code
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null); // the user will set this value
    // you need to tell TS here that this is of type FormArray (cast it) so you don't get an error
    // this kind of situation is rare:
    (<FormArray>this.signupForm.get('hobbies')).push(control); // you push a new control to the array in the signupForm
    // pressing the button creates a new FormControl (which we linked in the html to a text-input field)
    // it will be empty initially, but the user can type in it.
    // the user can add as many form controls as they want.
    // ng docs: FormArray tracks the value and validity state of an array of FormControl, FormGroup or FormArray instances.
  }
}
