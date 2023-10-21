import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRatingDialogComponent } from './event-rating-dialog.component';

describe('EventRatingDialogComponent', () => {
  let component: EventRatingDialogComponent;
  let fixture: ComponentFixture<EventRatingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventRatingDialogComponent]
    });
    fixture = TestBed.createComponent(EventRatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
