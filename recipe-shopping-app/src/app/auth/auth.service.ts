import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fireBaseApiKey = environment["FIREBASE_APIKEY"]

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.fireBaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).subscribe(response => {
      console.log(response);
    })
  }
}
