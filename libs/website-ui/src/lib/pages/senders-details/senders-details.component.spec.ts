import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendersDetailsComponent } from './senders-details.component';

describe('SendersDetailsComponent', () => {
  let component: SendersDetailsComponent;
  let fixture: ComponentFixture<SendersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendersDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SendersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
