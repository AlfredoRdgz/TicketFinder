import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoCompraComponent } from './evento-compra.component';

describe('EventoCompraComponent', () => {
  let component: EventoCompraComponent;
  let fixture: ComponentFixture<EventoCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
