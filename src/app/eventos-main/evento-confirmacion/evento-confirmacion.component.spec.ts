import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoConfirmacionComponent } from './evento-confirmacion.component';

describe('EventoConfirmacionComponent', () => {
  let component: EventoConfirmacionComponent;
  let fixture: ComponentFixture<EventoConfirmacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoConfirmacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
