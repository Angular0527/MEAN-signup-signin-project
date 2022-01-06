import { TestBed } from '@angular/core/testing';

import { ConfgService } from './confg.service';

describe('ConfgService', () => {
  let service: ConfgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
