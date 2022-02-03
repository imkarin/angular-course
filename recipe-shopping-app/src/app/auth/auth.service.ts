import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


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

  // comment this out to quickly see which files are using the usersubject (through errors):
  // currentUser = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
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
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) { // checks if token is (still) valid/there
      // update our state('s auth slice) with ngrx
      this.store.dispatch(new AuthActions.Login({
        email: userData.email,
        userId: userData.id,
        token: userData._token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }))
          // auto logout: pass whatever exp time is left over from now on (in ms):
      const expDurationLeft = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expDurationLeft);
      console.log('Time left until token expires: ' + expDurationLeft);
    }

  }

  logOut() {
    // update our state with ngrx
    this.store.dispatch(new AuthActions.Logout())

    this.router.navigate(['/auth']);

    // we will do this later in a sideefect of ngrx:
    localStorage.removeItem('userData');
    
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
    // we will do this later in a sideeffect of ngrx:
    localStorage.setItem('userData', JSON.stringify(user))

    // update our state('s auth slice) with ngrx
    this.store.dispatch(new AuthActions.Login({
      email: email,
      userId: localId,
      token: idToken,
      expirationDate: expirationDate
    }))

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
