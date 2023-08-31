import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OveralExpensesComponent } from './overal-expenses.component';

describe('OveralExpensesComponent', () => {
  let component: OveralExpensesComponent;
  let fixture: ComponentFixture<OveralExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OveralExpensesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OveralExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
