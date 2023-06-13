import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BouquetFormComponent } from './bouquet-form.component';

describe('BouquetFormComponent', () => {
  let component: BouquetFormComponent;
  let fixture: ComponentFixture<BouquetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BouquetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
