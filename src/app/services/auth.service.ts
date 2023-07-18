// Abhishek
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import endpoints from './endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  users: registerNS.IusersService = {};
  currentUser: string = '';
  // Rishabh
  registeruser(email: string, pass: string, name: string): void {
    this.users = { ...this.users, [email]: `${pass},|${name}` };
    this.currentUser = email;
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(endpoints.loginEndpoint, { email, password });
  }
  // Rishabh
  emailAlreadyExits(email: string): boolean {
    if (this.users[email]) {
      return true;
    } else return false;
  }

  getUsername(): string {
    return this.users[this.currentUser]?.split(',|')[1];
  }

  logoutUser(): void {
    localStorage.removeItem('token');
  }
}
