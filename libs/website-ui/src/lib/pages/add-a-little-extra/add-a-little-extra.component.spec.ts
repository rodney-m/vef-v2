import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddALittleExtraComponent } from './add-a-little-extra.component';

describe('AddALittleExtraComponent', () => {
  let component: AddALittleExtraComponent;
  let fixture: ComponentFixture<AddALittleExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddALittleExtraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddALittleExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
