import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private http = inject(HttpClient); // Modern injection
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  // Fetch users from API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // Add a new user
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}