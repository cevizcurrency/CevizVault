import { TestBed, inject } from '@angular/core/testing';

import { CevizBlockService } from './nano-block.service';

describe('CevizBlockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CevizBlockService]
    });
  });

  it('should be created', inject([CevizBlockService], (service: CevizBlockService) => {
    expect(service).toBeTruthy();
  }));
});
