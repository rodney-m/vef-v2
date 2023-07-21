import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BouquetImagesComponent } from './bouquet-images.component';

describe('BouquetImagesComponent', () => {
  let component: BouquetImagesComponent;
  let fixture: ComponentFixture<BouquetImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetImagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BouquetImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
