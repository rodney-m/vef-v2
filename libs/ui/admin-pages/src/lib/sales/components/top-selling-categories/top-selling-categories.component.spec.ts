import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopSellingCategoriesComponent } from './top-selling-categories.component';

describe('TopSellingCategoriesComponent', () => {
  let component: TopSellingCategoriesComponent;
  let fixture: ComponentFixture<TopSellingCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopSellingCategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopSellingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
