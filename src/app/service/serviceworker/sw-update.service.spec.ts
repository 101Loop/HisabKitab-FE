import { TestBed, inject } from '@angular/core/testing';

import { SwUpdateService } from './sw-update.service';

describe('SwUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwUpdateService]
    });
  });

  it('should be created', inject([SwUpdateService], (service: SwUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
