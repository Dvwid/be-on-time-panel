import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlaceComponent } from './event-place.component';

describe('EventPlaceComponent', () => {
  let component: EventPlaceComponent;
  let fixture: ComponentFixture<EventPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
