import { TestBed } from '@angular/core/testing';

import { ServicioCompraService } from './servicio-compra.service';

describe('ServicioCompraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioCompraService = TestBed.get(ServicioCompraService);
    expect(service).toBeTruthy();
  });
});
