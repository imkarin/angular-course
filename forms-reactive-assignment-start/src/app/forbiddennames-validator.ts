import { AsyncValidatorFn, FormControl } from "@angular/forms";
import { Observable } from "rxjs";

// Validates that a project name is not equal to one of the names in
// the provided forbiddenProjectNames array
export function forbiddenProjectNameValidator(forbiddenProjectNames: string[]) : AsyncValidatorFn {
  return function(control: FormControl) : Promise<any> | Observable<any> {
    const name = control.value.toLowerCase();
    const isNameForbidden = forbiddenProjectNames.includes(name); 

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
