import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewExtraComponent } from './view-extra.component';

describe('ViewExtraComponent', () => {
  let component: ViewExtraComponent;
  let fixture: ComponentFixture<ViewExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewExtraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
