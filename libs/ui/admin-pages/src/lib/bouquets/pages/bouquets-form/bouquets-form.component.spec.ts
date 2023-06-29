import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BouquetsFormComponent } from './bouquets-form.component';

describe('BouquetsFormComponent', () => {
  let component: BouquetsFormComponent;
  let fixture: ComponentFixture<BouquetsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BouquetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
