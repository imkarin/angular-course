import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Getting the form data with viewchild allows you to get the data anytime you want
  // since you can now use this myForm variable whenever
  @ViewChild('f') myForm: NgForm;
  secretAnswer: string = "Answer";
  genders: string[] = ["Male", "Female"];
  user: object = {};

  suggestUserName() {
    const suggestedName = 'Superuser';
    // With form.setValue you can overwrite the whole 'value' property of the form
    // this.myForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //     gender: '',
    //   },
    //   secretQuestion: '',
    //   secretAnswer: ''
    // })

    // with form.patchValue you can update a selection of values
    this.myForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  onSubmit() {
    console.log(this.myForm);

    this.user = { ... this.myForm.form.value };
    console.log(this.user);
  }
}
