import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import * as apex from 'ng-apexcharts';



@Component({
  selector: 'vef-sales-daily-chart',
  templateUrl: './sales-daily-chart.component.html',
  styleUrls: ['./sales-daily-chart.component.scss'],
  // changeDetection : ChangeDetectionStrategy.OnPush
})
export class SalesDailyChartComponent implements OnInit {
  series! : apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title! : apex.ApexTitleSubtitle;
  graphData : {x: string, y: number}[] = [];

  constructor(private service : ApiService, private cdr : ChangeDetectorRef){}


  ngOnInit () : void {
    this.initializeChartOptions();
    this.getData();
  }

  private initializeChartOptions() : void {
    this.title = {
      text : 'Top sales today'
    }

    
    this.series = [{
       name : 'Top Monthly Daily', 
       data : this.graphData,
       type: 'bar',
       color: '#ccc'
      }];

      this.chart = {
        type: 'bar',
      }

  }

  

  getData(){
    this.service.getFromUrl('/Sales/daily').subscribe({
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
        
        this.cdr.detectChanges();
        console.log(this.graphData);
      }
    })
  }

}
