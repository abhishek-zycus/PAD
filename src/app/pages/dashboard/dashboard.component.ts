import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {
    if (!localStorage.getItem('current')) {
      this.router.navigate(['/login']);
    }
  }

  username = localStorage
    .getItem(localStorage.getItem('current') ?? '')
    ?.split(',|')[1];

  basicData: any;

  basicOptions: any;

  dataPieChart: any;

  optionsPieChart: any;

  dataDoughnut: any;
  optionsDoughnut: any;
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42],
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: 'white',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: [41, 52, 24, 74, 23, 21, 32],
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

    const documentStylePieChart = getComputedStyle(document.documentElement);
    const textColorPieChart =
      documentStylePieChart.getPropertyValue('--text-color');

    this.dataPieChart = {
      labels: ['Product A', 'Product B', 'Product C'],
      datasets: [
        {
          data: [540, 325, 702],
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

    const documentStyleDoughnut = getComputedStyle(document.documentElement);
    const textColorDoughnut =
      documentStyleDoughnut.getPropertyValue('--text-color');

    this.dataDoughnut = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
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
  }
}
