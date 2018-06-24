import { TestBed, inject } from '@angular/core/testing';

import { APICallService } from './apicall.service';

describe('ApicallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APICallService]
    });
  });

  it('should be created', inject([APICallService], (service: APICallService) => {
    expect(service).toBeTruthy();
  }));
});
