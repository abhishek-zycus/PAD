// Abhishek

import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import isAuthenticated from 'src/app/utils/isAuthenticated.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {
    if (isAuthenticated()) {
      router.navigate(['/']);
    }
  }
  userData: loginrNS.ILoginCred = {
    email: '',
    password: '',
  };

  clearInput = (): void => {
    this.userData = {
      email: '',
      password: '',
    };
  };

  isSubmitButtonDisabled = (): boolean => {
    const { email, password } = this.userData;

    if (!email || !password) {
      return true;
    }
    return false;
  };
  isClearButtonDisabled = (): boolean => {
    const { email, password } = this.userData;
    if (email || password) {
      return false;
    }
    return true;
  };

  sumitLogin(event: Event) {
    event.preventDefault();
    const { email, password } = this.userData;
    if (!email.match(/^[\w\.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)+$/)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter valid E-mail!',
      });
    } else {
      this.authService.loginUser(email, password).subscribe(
        (data: any) => {
          console.log(data);
          if (data.success) {
            localStorage.setItem('token', data.token);
            this.router.navigate(['/']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Invalid Credentials!',
            });
          }
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid Credentials!',
          });
        }
      );
    }
  }
}
