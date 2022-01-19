import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { forbiddenProjectNameValidator } from './forbiddennames-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  projectForm: FormGroup;
  forbiddenProjectNames: string[] = ['test'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectdata' : new FormGroup({
        'projectname' : new FormControl('Example name', Validators.required, forbiddenProjectNameValidator(this.forbiddenProjectNames)),
        'email' : new FormControl('example@test.com', [Validators.required, Validators.email])
      }),
      'projectstatus' : new FormControl(null)
    })
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
