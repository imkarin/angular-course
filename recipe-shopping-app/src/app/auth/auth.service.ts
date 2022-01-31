import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { ActivatedRoute, Router } from '@angular/router';


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

  currentUser = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.fireBaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError), tap(res => {
      return this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
    }))
  }
  
  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.fireBaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError), tap(res => {
      return this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
    }));
  }

  logOut() {
    this.currentUser.next(null); // null is our BehaviorSubject's initial value, and when you log out it becomes null again
    this.router.navigate(['/auth']); // add the slash before the route for absolute routing
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    // response expiresIn = a string with number of seconds in which the ID token expires
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);

    // we update our current user (as a subject, so that components can subscribe to it!)
    this.currentUser.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred!'

      if (errorRes.error && errorRes.error.error) {
        switch(errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'An account with this email already exists.';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email address not found.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'Invalid credentials.';
            break;
        }
      }
      return throwError(errorMessage); // we throw an observable that only contains a message
  }
}
