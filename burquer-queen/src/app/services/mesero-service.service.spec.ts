import { TestBed } from '@angular/core/testing';

import { MeseroServiceService } from './mesero-service.service';

describe('MeseroServiceService', () => {
  let service: MeseroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeseroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
