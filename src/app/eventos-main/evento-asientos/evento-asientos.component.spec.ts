import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoAsientosComponent } from './evento-asientos.component';

describe('EventoAsientosComponent', () => {
  let component: EventoAsientosComponent;
  let fixture: ComponentFixture<EventoAsientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoAsientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoAsientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
