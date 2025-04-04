import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginRequest} from '../../../models/login-request.model';
import {Observable, tap} from 'rxjs';
import {SignInResponse} from '../../../models/sign-in-response.model';
import {User} from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  createUser(usuario: User): Observable<SignInResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<SignInResponse>(this.apiUrl, usuario, {headers}).pipe();
  }

  getUserById(user: User): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<User>(`${this.apiUrl}/${user.id}`, { headers }).pipe();
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<User[]>(this.apiUrl, {headers}).pipe();
  }

  editUserById(usuario: User): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<User>(`${this.apiUrl}/${usuario.id}`, usuario, { headers }).pipe();
  }

  deleteUserById(usuario: User){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete<User>(`${this.apiUrl}/${usuario.id}`, { headers }).pipe();
  }
}
