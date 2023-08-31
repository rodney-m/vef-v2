import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesMonthlyChartComponent } from './sales-monthly-chart.component';

describe('SalesMonthlyChartComponent', () => {
  let component: SalesMonthlyChartComponent;
  let fixture: ComponentFixture<SalesMonthlyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesMonthlyChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesMonthlyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
