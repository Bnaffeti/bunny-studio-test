import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_BASE_URL = `${environment.back_url}/users`;

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.API_BASE_URL}`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.API_BASE_URL}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}/${id}`, { responseType: 'text' });
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}`);
  }
}