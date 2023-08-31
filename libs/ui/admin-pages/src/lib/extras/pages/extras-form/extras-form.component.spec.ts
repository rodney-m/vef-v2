import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtrasFormComponent } from './extras-form.component';

describe('ExtrasFormComponent', () => {
  let component: ExtrasFormComponent;
  let fixture: ComponentFixture<ExtrasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtrasFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtrasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
