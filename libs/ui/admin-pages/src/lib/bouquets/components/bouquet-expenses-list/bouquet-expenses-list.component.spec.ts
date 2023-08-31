import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BouquetExpensesListComponent } from './bouquet-expenses-list.component';

describe('BouquetExpensesListComponent', () => {
  let component: BouquetExpensesListComponent;
  let fixture: ComponentFixture<BouquetExpensesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetExpensesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BouquetExpensesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
