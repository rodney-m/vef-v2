import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarchatBestSellingProductsComponent } from './barchat-best-selling-products.component';

describe('BarchatBestSellingProductsComponent', () => {
  let component: BarchatBestSellingProductsComponent;
  let fixture: ComponentFixture<BarchatBestSellingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarchatBestSellingProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarchatBestSellingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
