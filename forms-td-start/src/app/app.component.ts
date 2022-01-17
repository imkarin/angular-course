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

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    console.log(this.myForm);
  }
}
