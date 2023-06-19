import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrEditBouquetPageComponent } from './add-or-edit-bouquet-page.component';

describe('AddOrEditBouquetPageComponent', () => {
  let component: AddOrEditBouquetPageComponent;
  let fixture: ComponentFixture<AddOrEditBouquetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditBouquetPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrEditBouquetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
