import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean // the login response contains registered key 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fireBaseApiKey = environment["FIREBASE_APIKEY"]

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.fireBaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError));
  }
  
  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.fireBaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred!'

      if (errorRes.error && errorRes.error.error) {
        switch(errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'An account with this email already exists.';
          case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email address not found.';
              case 'INVALID_PASSWORD':
                errorMessage = 'Invalid password.';
        }
      }
      return throwError(errorMessage); // we throw an observable that only contains a message
  }
}
