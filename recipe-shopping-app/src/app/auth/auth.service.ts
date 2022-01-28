import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fireBaseUrl = environment["FIREBASE_URL"]
  private fireBaseApiKey = environment["FIREBASE_APIKEY"]

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    console.log(email, password)
    this.http.post(
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
