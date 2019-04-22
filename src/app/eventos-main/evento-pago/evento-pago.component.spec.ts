import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoPagoComponent } from './evento-pago.component';

describe('EventoPagoComponent', () => {
  let component: EventoPagoComponent;
  let fixture: ComponentFixture<EventoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
