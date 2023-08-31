import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllBouquetsInfiniteScrollComponent } from './all-bouquets-infinite-scroll.component';

describe('AllBouquetsInfiniteScrollComponent', () => {
  let component: AllBouquetsInfiniteScrollComponent;
  let fixture: ComponentFixture<AllBouquetsInfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBouquetsInfiniteScrollComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllBouquetsInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
