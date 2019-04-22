import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoBoletosComponent } from './evento-boletos.component';

describe('EventoBoletosComponent', () => {
  let component: EventoBoletosComponent;
  let fixture: ComponentFixture<EventoBoletosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoBoletosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
