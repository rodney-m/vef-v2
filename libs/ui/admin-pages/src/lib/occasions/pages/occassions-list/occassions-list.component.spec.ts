import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OccassionsListComponent } from './occassions-list.component';

describe('OccassionsListComponent', () => {
  let component: OccassionsListComponent;
  let fixture: ComponentFixture<OccassionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OccassionsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccassionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
