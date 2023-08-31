import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopSellingProductsOverallComponent } from './top-selling-products-overall.component';

describe('TopSellingProductsOverallComponent', () => {
  let component: TopSellingProductsOverallComponent;
  let fixture: ComponentFixture<TopSellingProductsOverallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopSellingProductsOverallComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopSellingProductsOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
