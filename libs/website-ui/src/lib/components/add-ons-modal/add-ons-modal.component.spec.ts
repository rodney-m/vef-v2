import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOnsModalComponent } from './add-ons-modal.component';

describe('AddOnsModalComponent', () => {
  let component: AddOnsModalComponent;
  let fixture: ComponentFixture<AddOnsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOnsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOnsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
