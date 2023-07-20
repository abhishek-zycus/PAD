import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { error } from 'console';
import isAuthenticated from 'src/app/utils/isAuthenticated.utils';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css'],
})
export class AdminPortalComponent {
  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {
    if (!isAuthenticated()) {
      router.navigate(['/login']);
    } else {
      this.authService.canUserCreateRole().subscribe(
        (data) => {},
        (error) => {
          if (error.status === 401) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Permission denied',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong!',
            });
          }
          router.navigate(['/']);

          console.log(error);
        }
      );
    }
  }
  role: roleNS.IroleCred = {
    role: '',
    isTotalContractVisible: false,
    isAvgRevenueVisible: false,
    isTotalDuePaymentVisible: false,
    isTotalExpectedPaymentVisible: false,
    canCreateRole: false,
  };

  clearInput = (): void => {
    this.role = {
      role: '',
      isTotalContractVisible: false,
      isAvgRevenueVisible: false,
      isTotalDuePaymentVisible: false,
      isTotalExpectedPaymentVisible: false,
      canCreateRole: false,
    };
  };

  isSubmitButtonDisabled = (): boolean => {
    const {
      role,
      isTotalContractVisible,
      isAvgRevenueVisible,
      isTotalDuePaymentVisible,
      isTotalExpectedPaymentVisible,
      canCreateRole,
    } = this.role;

    if (
      !role ||
      (!isTotalContractVisible &&
        !isAvgRevenueVisible &&
        !isTotalDuePaymentVisible &&
        !isTotalExpectedPaymentVisible &&
        !canCreateRole)
    ) {
      return true;
    }
    return false;
  };
  isClearButtonDisabled = (): boolean => {
    const { role } = this.role;
    if (role) {
      return false;
    }
    return true;
  };

  submitRole(event: Event) {
    event.preventDefault();
    const {
      role,
      isTotalContractVisible,
      isAvgRevenueVisible,
      isTotalDuePaymentVisible,
      isTotalExpectedPaymentVisible,
      canCreateRole,
    } = this.role;

    console.log(role);
    this.authService
      .roleEntry(
        role,
        isTotalContractVisible,
        isAvgRevenueVisible,
        isTotalDuePaymentVisible,
        isTotalExpectedPaymentVisible,
        canCreateRole
      )
      .subscribe(
        (data: any) => {
          if (data.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Role Added successful',
            });
            this.clearInput();
          }
        },
        (error) => {
          if (error.status === 401) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Role name already exits!',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong!',
            });
          }
        }
      );
  }
}
