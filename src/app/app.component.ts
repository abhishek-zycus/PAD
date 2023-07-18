import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent {
  constructor() {}
  public spinkit = Spinkit.skSpinnerPulse;
  title = 'PAD';
}
