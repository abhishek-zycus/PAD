//Abhishek

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import isAuthenticated from 'src/app/utils/isAuthenticated.utils';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  apiData: any;
  username = this.authService.getUsername();
  basicData: any;

  basicOptions: any;

  dataPieChart: any;

  optionsPieChart: any;

  dataDoughnut: any;
  optionsDoughnut: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {
    if (!isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.authService.canUserCreateRole().subscribe(
        (data) => {
          if (data.success) {
            this.authService.setShowAdminPortalLink(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );

      this.dashboardService.getDashoardData().subscribe(
        (data) => {
          data = data.data;
          this.apiData = data;
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');
          const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
          );
          const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');
          this.basicData = {
            labels: data.top5CompanyByDuePayment.companyName,
            datasets: [
              {
                type: 'bar',
                label: 'Due Payment',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: data.top5CompanyByDuePayment.correspondingDuePayment,
                borderColor: 'white',
                borderWidth: 2,
              },
              {
                type: 'bar',
                label: 'Expected Payment',
                backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                data: data.top5CompanyByDuePayment.correspondingPayment,
              },
            ],
          };

          this.basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                },
              },
              y: {
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                },
              },
            },
          };

          const documentStylePieChart = getComputedStyle(
            document.documentElement
          );
          const textColorPieChart =
            documentStylePieChart.getPropertyValue('--text-color');

          this.dataPieChart = {
            labels: data.top5CompanyByPayment.companyName,
            datasets: [
              {
                data: data.top5CompanyByPayment.correspondingPayment,
                backgroundColor: [
                  documentStylePieChart.getPropertyValue('--blue-500'),
                  documentStylePieChart.getPropertyValue('--yellow-500'),
                  documentStylePieChart.getPropertyValue('--green-500'),
                ],
                hoverBackgroundColor: [
                  documentStylePieChart.getPropertyValue('--blue-400'),
                  documentStylePieChart.getPropertyValue('--yellow-400'),
                  documentStylePieChart.getPropertyValue('--green-400'),
                ],
              },
            ],
          };

          this.optionsPieChart = {
            plugins: {
              legend: {
                labels: {
                  usePointStyle: true,
                  color: textColorPieChart,
                },
              },
            },
          };

          const documentStyleDoughnut = getComputedStyle(
            document.documentElement
          );
          const textColorDoughnut =
            documentStyleDoughnut.getPropertyValue('--text-color');

          this.dataDoughnut = {
            labels: data.top5CompanyByDuePayment.companyName,
            datasets: [
              {
                data: data.top5CompanyByDuePayment.correspondingDuePayment,
                backgroundColor: [
                  documentStyleDoughnut.getPropertyValue('--blue-500'),
                  documentStyleDoughnut.getPropertyValue('--yellow-500'),
                  documentStyleDoughnut.getPropertyValue('--green-500'),
                ],
                hoverBackgroundColor: [
                  documentStyleDoughnut.getPropertyValue('--blue-400'),
                  documentStyleDoughnut.getPropertyValue('--yellow-400'),
                  documentStyleDoughnut.getPropertyValue('--green-400'),
                ],
              },
            ],
          };

          this.optionsDoughnut = {
            cutout: '60%',
            plugins: {
              legend: {
                labels: {
                  color: textColorDoughnut,
                },
              },
            },
          };
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit() {}
}
