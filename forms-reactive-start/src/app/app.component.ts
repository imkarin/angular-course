import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
  signupForm: FormGroup; // in angular, a form = just a group of controls
  forbiddenUsernames: string[] = ['Admin', 'Moderator'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      // you add controls here in key-value pairs
      'userData': new FormGroup({
        'username': new FormControl('SuperUser', [Validators.required, this.forbiddenNamesCheck.bind(this)]), 
        // bind: good old javascript trick to make sure that "this" refers to this component
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailCheck), // you can also add an array of validators, async validator = 3rd argument
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

  // Making our own validator
  // A validator is just a function
  forbiddenNamesCheck(control: FormControl): {[s: string]: boolean} {
    // check if the value of the control is part of the forbiddenUserNames array
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
    // Gotcha: 'this'^ word will not automatically be recognizd as this component
    // angular is the one calling the code somewhere, so 'this' doesn't refer to this component anymore
    // you have to BIND this (up in the signupForm) to our 'this'
      return {'usernameIsForbidden': true};
    }
    return null; // IMPORTANT: if validation is successfull, you have to pass nothing or null
    // that's how you tell angular that a form control is valid
  }

  forbiddenEmailCheck(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => { // promises always receive a function with resolve and reject
      // Simulate reaching out to a server
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true}) // promise resolves with the same error-object as with synchronous normal validators
        } else {
          resolve(null) // promise resolves with the same null (if control's input=valid)
        }
      }, 1500)
    })
    return promise
  }
}
