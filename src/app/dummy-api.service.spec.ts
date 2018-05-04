import { TestBed, inject } from '@angular/core/testing';

import { DummyApiService } from './dummy-api.service';

describe('DummyApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DummyApiService]
    });
  });

  it('should be created', inject([DummyApiService], (service: DummyApiService) => {
    expect(service).toBeTruthy();
  }));
});
