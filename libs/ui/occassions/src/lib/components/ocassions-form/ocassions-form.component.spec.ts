import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcassionsFormComponent } from './ocassions-form.component';

describe('OcassionsFormComponent', () => {
  let component: OcassionsFormComponent;
  let fixture: ComponentFixture<OcassionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OcassionsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OcassionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
