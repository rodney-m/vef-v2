import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BouquetsUpdateComponent } from './bouquets-update.component';

describe('BouquetsUpdateComponent', () => {
  let component: BouquetsUpdateComponent;
  let fixture: ComponentFixture<BouquetsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetsUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BouquetsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
