import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {LoginRequest} from '../../models/login-request.model';
import {Observable, tap} from 'rxjs';
import {SignInResponse} from '../../models/sign-in-response.model';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private apiUrl = `${environment.apiUrl}/signin`;

  constructor(private http: HttpClient) { }

  signIn(login: LoginRequest): Observable<SignInResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<SignInResponse>(this.apiUrl, login, {headers}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.user.firstName)
      })
    );
  }
}
