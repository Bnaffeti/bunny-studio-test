import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_BASE_URL = `${environment.back_url}/tasks`;

  constructor(private http: HttpClient) { }

  getTasksByTaskId(id: number): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/${id}`);
  }

  createTask(task: Object): Observable<Object> {
    return this.http.post(`${this.API_BASE_URL}`, task);
  }

  updateTask(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.API_BASE_URL}/${id}`, value);
  }

}