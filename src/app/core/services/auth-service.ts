import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private router: Router) {}

  login(token: string) {
    localStorage.setItem('token', token);
    this.isAuthenticated.set(true);
    this.router.navigate(['/admin/dashboard']);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
}