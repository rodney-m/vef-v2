import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesMonthlyPiechartComponent } from './sales-monthly-piechart.component';

describe('SalesMonthlyPiechartComponent', () => {
  let component: SalesMonthlyPiechartComponent;
  let fixture: ComponentFixture<SalesMonthlyPiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesMonthlyPiechartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesMonthlyPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
