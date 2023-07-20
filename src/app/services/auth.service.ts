// Abhishek
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import endpoints from './endpoints';
import { Observable } from 'rxjs';
import axios from 'axios';
import getAccessToken from '../utils/getAccessToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  showAdminPortalLink: boolean = false;
  users: registerNS.IusersService = {};
  currentUser: string = '';
  // Rishabh
  registeruser(
    email: string,
    pass: string,
    name: string,
    role: string
  ): Observable<any> {
    // console.log(this.getUser(email, name, pass, role));
    console.log(email);
    return this.http.post(endpoints.registerEndpoint, {
      email,
      name,
      password: pass,
      role,
    });
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

  roleEntry(
    role: string,
    isTotalContractVisible: boolean,
    isAvgRevenueVisible: boolean,
    isTotalDuePaymentVisible: boolean,
    isTotalExpectedPaymentVisible: boolean,
    canCreateRole: boolean
  ): Observable<any> {
    return this.http.post(
      endpoints.roleEndpoint,
      {
        roleName: role,
        permissions: {
          isTotalContractVisible,
          isAvgRevenueVisible,
          isTotalDuePaymentVisible,
          isTotalExpectedPaymentVisible,
          canCreateRole,
        },
      },
      {
        headers: {
          Authorization: getAccessToken(),
        },
      }
    );
  }

  setShowAdminPortalLink(show: boolean): void {
    this.showAdminPortalLink = show;
  }

  canUserCreateRole(): Observable<any> {
    return this.http.get(endpoints.canCreateRoleEndpoint, {
      headers: {
        Authorization: getAccessToken(),
      },
    });
  }

  logoutUser(): void {
    localStorage.removeItem('token');
  }
}
