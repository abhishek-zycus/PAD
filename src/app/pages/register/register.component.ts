// Rishabh

import { Component, DoCheck } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import isAuthenticated from 'src/app/utils/isAuthenticated.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements DoCheck {
  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {
    if (isAuthenticated()) {
      router.navigate(['/']);
    }
  }
  userData: registerNS.IUserData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'NORMAL',
  };

  clearInput = (): void => {
    this.userData = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'NORMAL',
    };
  };

  isSubmitButtonDisabled = (): boolean => {
    const { name, email, password, confirmPassword } = this.userData;
    if (!name || !email || !password || !confirmPassword) {
      return true;
    }
    return false;
  };
  isClearButtonDisabled = (): boolean => {
    const { name, email, password, confirmPassword } = this.userData;
    if (name || email || password || confirmPassword) {
      return false;
    }
    return true;
  };

  sumitRegister(event: Event) {
    event.preventDefault();
    const { name, email, password, confirmPassword, role } = this.userData;
    if (!this.isSubmitButtonDisabled()) {
      if (!email.match(/^[\w\.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)+$/)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Enter valid E-mail!',
        });
      } else {
        if (password === confirmPassword) {
          if (!this.authService.emailAlreadyExits(email)) {
            this.authService
              .registeruser(email, password, name, role)
              .subscribe(
                (data: any) => {
                  console.log(data);
                  if (data.success) {
                    localStorage.setItem('token', data.token);
                    this.router.navigate(['/']);
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: 'Registered Successfully',
                    });
                  }
                },

                (error) => {
                  console.log(error);
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Registration Failed!',
                  });
                }
              );
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Email is already registered!',
            });
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Password and Confirm Password are not same!',
          });
        }
      }
    }
  }

  ngDoCheck() {}
}
