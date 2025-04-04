import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  private apiUrl = `${environment.apiUrl}/me`;

  constructor(private http: HttpClient) { }

  getMe(): Observable<User>{
    return this.http.get<User>(this.apiUrl).pipe();
  }
}
