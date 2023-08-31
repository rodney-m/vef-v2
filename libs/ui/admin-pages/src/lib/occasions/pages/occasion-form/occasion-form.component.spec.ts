import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OccasionFormComponent } from './occasion-form.component';

describe('OccasionFormComponent', () => {
  let component: OccasionFormComponent;
  let fixture: ComponentFixture<OccasionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OccasionFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccasionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
