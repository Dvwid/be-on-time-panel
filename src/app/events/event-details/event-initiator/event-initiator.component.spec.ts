import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInitiatorComponent } from './event-initiator.component';

describe('EventInitiatorComponent', () => {
  let component: EventInitiatorComponent;
  let fixture: ComponentFixture<EventInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
