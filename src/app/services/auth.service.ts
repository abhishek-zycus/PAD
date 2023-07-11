import { Injectable, DoCheck } from '@angular/core';
import user from 'src/data/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements DoCheck {
  constructor() {}

  users: registerNS.IusersService = {};
  currentUser: string = '';

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
  ngDoCheck(): void {
    console.log(this.users);
  }
}
