// Abhishek
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import endpoints from './endpoints';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // async getUser(email: string, name: string, pass: string, role: string) {
  //   return await axios({
  //     url: "http://localhost:5000/api/register",
  //     method: "POST",
  //     headers: {
  //       'Content-Type': "application/json",
  //     },
  //     data: {
  //       email: email, password: pass, name: name, role:role,
  //     }
  //   })
  // }
  // async loginUserAxios(email: string, pass: string) {
  //   return await axios({
  //     url: "http://localhost:5000/api/login",
  //     method: "POST",
  //     headers: {
  //       'Content-Type': "application/json",
  //     },
  //     data: {
  //       email: email, password: pass
  //     }
  //   })
  // }

  users: registerNS.IusersService = {};
  currentUser: string = '';
  // Rishabh
  registeruser(email: string, pass: string, name: string, role: string): Observable<any> {
    // console.log(this.getUser(email, name, pass, role));
    console.log(email)
    return this.http.post(endpoints.registerEndpoint, { email, name, password: pass, role });
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
