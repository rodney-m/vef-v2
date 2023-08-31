import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyingProcessPageComponent } from './buying-process-page.component';

describe('BuyingProcessPageComponent', () => {
  let component: BuyingProcessPageComponent;
  let fixture: ComponentFixture<BuyingProcessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyingProcessPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyingProcessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
