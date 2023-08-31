import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditBouquetExpenseComponent } from './add-edit-bouquet-expense.component';

describe('AddEditBouquetExpenseComponent', () => {
  let component: AddEditBouquetExpenseComponent;
  let fixture: ComponentFixture<AddEditBouquetExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditBouquetExpenseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditBouquetExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
