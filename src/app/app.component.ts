import { Component, DoCheck } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent implements DoCheck {
  constructor() {}
  title = 'PAD';

  isAuthenticated: boolean = false;
  checkAuth() {
    if (
      localStorage.getItem('current') &&
      localStorage.getItem(localStorage.getItem('current') ?? '')
    ) {
      this.isAuthenticated = true;
    }
  }
  ngDoCheck() {
    this.checkAuth();
  }
}
