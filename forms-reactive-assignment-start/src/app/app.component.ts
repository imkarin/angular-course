import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
        // 'projectname' : new FormControl('Example name', this.forbiddenProjectNamesCheck.bind(this)),
        'projectname' : new FormControl('Example name', Validators.required, this.forbiddenProjectNamesCheck.bind(this)),
        'email' : new FormControl('example@test.com', [Validators.required, Validators.email])
      }),
      'projectstatus' : new FormControl(null)
    })
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  // forbiddenProjectNamesCheck(control: FormControl): {[s: string]: boolean } | null {
  //   const name = control.value.toLowerCase();
  //   const isNameForbidden = this.forbiddenProjectNames.includes(name); 
  //   return isNameForbidden ? { 'projectNameForbidden' : true } : null;
  // }

  forbiddenProjectNamesCheck(control: FormControl): Promise<any> | Observable<any> {
    const name = control.value.toLowerCase();
    const isNameForbidden = this.forbiddenProjectNames.includes(name); 

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isNameForbidden) {
          resolve({'projectNameForbidden' : true});
        } else {
          resolve(null);
        }
      }, 1000)
    })
    return promise;
  }
}
