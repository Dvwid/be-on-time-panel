import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlaceFormComponent } from './event-place-form.component';

describe('EventPlaceFormComponent', () => {
  let component: EventPlaceFormComponent;
  let fixture: ComponentFixture<EventPlaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPlaceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPlaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
