import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesBouquetsListComponent } from './expenses-bouquets-list.component';

describe('ExpensesBouquetsListComponent', () => {
  let component: ExpensesBouquetsListComponent;
  let fixture: ComponentFixture<ExpensesBouquetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensesBouquetsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesBouquetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
