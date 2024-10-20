import { TestBed } from '@angular/core/testing';

import { QuickBloxService } from './quick-blox.service';

describe('QuickBloxService', () => {
  let service: QuickBloxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickBloxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
