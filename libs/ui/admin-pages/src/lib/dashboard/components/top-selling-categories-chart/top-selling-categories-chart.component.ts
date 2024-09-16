import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle } from 'ng-apexcharts';


@Component({
  selector: 'vef-top-selling-categories-chart',
  templateUrl: './top-selling-categories-chart.component.html',
  styleUrls: ['./top-selling-categories-chart.component.scss'],
})
export class TopSellingCategoriesChartComponent implements OnInit {
  chartSeries: ApexNonAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'donut',
    toolbar: {
      show: true,
    },
  };

  series!: ApexNonAxisChartSeries;
  labels: string[] = [];

  chartLabels!: string[] | any[];

  chartTitle: ApexTitleSubtitle = {
    text: 'Top Selling Categories',
  };

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getFromUrl('/Sales/bestselling/occasions').subscribe({
      next: (res) => {
        this.chartSeries = res.data.map((xData: any) => xData.totalUnitsSold);
        this.chartLabels = res.data.map((xData: any) => xData.bouquet.occasion.type);
      },
    });
  }
}
