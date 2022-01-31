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
  private tokenExpirationTimer: any;

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

  autoLogIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return; // we cant log the user in, there's no data
    }

    // automatically log in user with token from localstorage:
    // the LS object will no longer be an instance of your User model, you have to do that yourself:
    const loadedUser = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate)
    
    if (loadedUser.token) { // checks if token is (still) valid/there
      this.currentUser.next(loadedUser); // set our currentUser to the LS-retrieved user
      // auto logout: pass whatever exp time is left over from now on (in ms):
      const expDurationLeft = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expDurationLeft);
    }

  }

  logOut() {
    this.currentUser.next(null); // null is our BehaviorSubject's initial value, and when you log out it becomes null again
    this.router.navigate(['/auth']); // add the slash before the route for absolute routing
    localStorage.removeItem('userData'); // remove userdata from localstorage
    
    // make sure we don't accidentally logOut() again after token expiration, 
    // since we're already logging out:
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration)
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    // response expiresIn = a string with number of seconds in which the ID token expires
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);

    // save user data/token in localStorage
    localStorage.setItem('userData', JSON.stringify(user))

    // we update our current user (as a subject, so that components can subscribe to it!)
    this.currentUser.next(user);

    // autologout, and pass our current expiration time from now in ms:
    this.autoLogOut(expiresIn * 1000);
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
