import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import * as apex from 'ng-apexcharts';

@Component({
  selector: 'vef-sales-monthly-chart',
  templateUrl: './sales-monthly-chart.component.html',
  styleUrls: ['./sales-monthly-chart.component.scss'],
})
export class SalesMonthlyChartComponent implements OnInit {
  series! : apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title! : apex.ApexTitleSubtitle;
  graphData : {x: string, y: number}[] = [];

  constructor(private service : ApiService ){}

  ngOnInit () : void {
    this.initializeChartOptions();
    this.getData();
  }

  private initializeChartOptions() : void {
    this.title = {
      text : 'Top sales this month'
    }

    
    this.series = [{
       name : 'Top Monthly Sales', 
       data : this.graphData,
       type: 'bar',
       color: '#ccc'
      }];

      this.chart = {
        type: 'bar',
      }

  }

  

  getData(){
    this.service.getFromUrl('/Sales/monthly').subscribe({
      next: (res) =>{

        this.graphData = res.data.map((xData : any) => {
          return {
            x: xData.product.name,
            y: xData.totalUnitsSold
          }
        });

        this.series = [
          {
            name: 'Top Monthly Sales',
            data: this.graphData,
            type: 'bar',
            color: '#971c26'
          }
        ];
      }
    })
  }


}
