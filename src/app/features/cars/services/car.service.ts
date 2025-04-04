import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../../models/user.model';
import {Observable} from 'rxjs';
import {SignInResponse} from '../../../models/sign-in-response.model';
import {Car} from '../../../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = `${environment.apiUrl}/cars`;

  constructor(private http: HttpClient) { }

  createCar(car: Car): Observable<SignInResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<SignInResponse>(this.apiUrl, car, {headers}).pipe();
  }

  getCars(): Observable<Car[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Car[]>(this.apiUrl, {headers}).pipe();
  }

  getCarById(car: Car): Observable<Car> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Car>(`${this.apiUrl}/${car.id}`, { headers }).pipe();
  }

  editCarById(car: Car): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<User>(`${this.apiUrl}/${car.id}`, car, { headers }).pipe();
  }

  deleteCarById(car: Car){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete<Car>(`${this.apiUrl}/${car.id}`, { headers }).pipe();
  }
}
