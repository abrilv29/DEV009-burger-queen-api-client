import { TestBed } from '@angular/core/testing';

import { MeseroOrdersService } from './mesero-orders.service';

describe('MeseroOrdersService', () => {
  let service: MeseroOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeseroOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
