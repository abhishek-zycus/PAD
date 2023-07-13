// Abhishek

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  users: registerNS.IusersService = {};
  currentUser: string = '';
  // Rishabh
  registeruser(email: string, pass: string, name: string): void {
    this.users = { ...this.users, [email]: `${pass},|${name}` };
    this.currentUser = email;
  }

  loginUser(email: string, pass: string): boolean {
    if (!this.users[email]) {
      return false;
    } else {
      if (this.users[email]?.split(',|')[0] === pass) {
        this.currentUser = email;
        return true;
      } else {
        return false;
      }
    }
  }

  emailAlreadyExits(email: string): boolean {
    if (this.users[email]) {
      return true;
    } else return false;
  }

  getUsername(): string {
    return this.users[this.currentUser]?.split(',|')[1];
  }

  logoutUser(): void {
    this.currentUser = '';
  }
}
