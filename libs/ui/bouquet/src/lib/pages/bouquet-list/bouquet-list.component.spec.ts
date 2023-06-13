import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BouquetListComponent } from './bouquet-list.component';

describe('BouquetListComponent', () => {
  let component: BouquetListComponent;
  let fixture: ComponentFixture<BouquetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BouquetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
