import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsFilteringPageComponent } from './products-filtering-page.component';

describe('ProductsFilteringPageComponent', () => {
  let component: ProductsFilteringPageComponent;
  let fixture: ComponentFixture<ProductsFilteringPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsFilteringPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFilteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
