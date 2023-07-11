import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    if (this.authService.currentUser.length) {
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

  // sumitLogin(event: Event) {
  //   event.preventDefault();
  //   const { email, password } = this.userData;
  //   if (!email.match(/^[\w\.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)+$/)) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Enter valid E-mail!',
  //     });
  //   } else {
  //     if (localStorage.getItem(email)) {
  //       const pass = localStorage.getItem(email)?.split(',|')[0];
  //       if (password === pass) {
  //         localStorage.setItem('current', email);
  //         this.router.navigate(['/']);
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Success',
  //           detail: 'Login successful',
  //         });
  //       } else {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: 'Credentials are incorrect',
  //         });
  //       }
  //     }
  //   }
  // }

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
      if (this.authService.emailAlreadyExits(email)) {
        const isLoggedIn = this.authService.loginUser(email, password);
        if (isLoggedIn) {
          this.router.navigate(['/']);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Credentials are incorrect',
          });
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'no existig account with the email',
        });
      }
    }
  }
}
