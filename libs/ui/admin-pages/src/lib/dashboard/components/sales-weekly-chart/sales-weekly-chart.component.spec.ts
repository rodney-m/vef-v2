import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesWeeklyChartComponent } from './sales-weekly-chart.component';

describe('SalesWeeklyChartComponent', () => {
  let component: SalesWeeklyChartComponent;
  let fixture: ComponentFixture<SalesWeeklyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesWeeklyChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesWeeklyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
