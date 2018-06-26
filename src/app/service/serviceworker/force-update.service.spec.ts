import { TestBed, inject } from '@angular/core/testing';

import { ForceUpdateService } from './force-update.service';

describe('ForceUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForceUpdateService]
    });
  });

  it('should be created', inject([ForceUpdateService], (service: ForceUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
