import { Component, DoCheck, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import isMobile from 'src/app/utils/isMobile.utils';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck {
  constructor(private router: Router, private messageService: MessageService) {}
  isMobile: boolean = false;
  @Input() isLoggedIn: boolean = true;

  logoutUser() {
    localStorage.removeItem('current');
    this.router.navigate(['/login']);
    this.messageService.add({
      severity: 'success',
      key: 'Success',
      detail: 'Logout successful',
    });
    this.isLoggedIn = false;
  }

  ngDoCheck() {
    console.log(this.isLoggedIn);
    this.isMobile = isMobile();
  }
}
