import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '@vef/core';
import * as apex from 'ng-apexcharts';


@Component({
  selector: 'vef-sales-weekly-chart',
  templateUrl: './sales-weekly-chart.component.html',
  styleUrls: ['./sales-weekly-chart.component.scss'],
})
export class SalesWeeklyChartComponent {
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
      text : 'Top sales this week'
    }

    
    this.series = [{
       name : 'Top Weekly Sales', 
       data : this.graphData,
       type: 'bar',
       color: '#ccc'
      }];

      this.chart = {
        type: 'bar',
      }

  }

  

  getData(){
    this.service.getFromUrl('/Sales/weekly').subscribe({
      next: (res) =>{

        this.graphData = res.data.map((xData : any) => {
          return {
            x: xData.bouquet.name,
            y: xData.totalUnitsSold
          }
        });

        this.series = [
          {
            name: 'Top Weekly Sales',
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
