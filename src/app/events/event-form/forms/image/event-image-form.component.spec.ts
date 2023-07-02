import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventImageFormComponent } from './event-image-form.component';

describe('EventImageFormComponent', () => {
  let component: EventImageFormComponent;
  let fixture: ComponentFixture<EventImageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventImageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
