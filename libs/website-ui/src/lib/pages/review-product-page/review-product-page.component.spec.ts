import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewProductPageComponent } from './review-product-page.component';

describe('ReviewProductPageComponent', () => {
  let component: ReviewProductPageComponent;
  let fixture: ComponentFixture<ReviewProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewProductPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
