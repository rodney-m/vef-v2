import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesDailyChartComponent } from './sales-daily-chart.component';

describe('SalesDailyChartComponent', () => {
  let component: SalesDailyChartComponent;
  let fixture: ComponentFixture<SalesDailyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesDailyChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesDailyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
