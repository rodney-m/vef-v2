import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import * as apex from 'ng-apexcharts';


@Component({
  selector: 'vef-top-selling-categories-chart',
  templateUrl: './top-selling-categories-chart.component.html',
  styleUrls: ['./top-selling-categories-chart.component.scss'],
})
export class TopSellingCategoriesChartComponent implements OnInit {
  series! : apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title! : apex.ApexTitleSubtitle;
  graphData : {x: string, y: number}[] = [];

  constructor(private service : ApiService){}


  ngOnInit () : void {
    this.initializeChartOptions();
    this.getData();
  }

  private initializeChartOptions() : void {
    this.title = {
      text : 'Top selling Categories'
    }

    
    this.series = [{
       name : 'Top Selling Categories', 
       data : this.graphData,
       color: '#ccc'
      }];

      this.chart = {
        type: 'bar',
      }

  }

  

  getData(){
    this.service.getFromUrl('/Sales/bestselling/occasions').subscribe({
      next: (res) =>{

        this.graphData = res.data.map((xData : any) => {
          return {
            x: xData.occasion.type,
            y: xData.totalUnitsSold
          }
        });

        console.log(this.graphData);

        this.series = [
          {
            name: 'Top Monthly Sales',
            data: this.graphData,
            color: '#971c26'
          }
        ];
        
      }
    })
  }
}
