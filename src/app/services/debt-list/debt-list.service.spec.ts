import { TestBed } from '@angular/core/testing';

import { DebtListService } from './debt-list.service';

describe('DebtListService', () => {
  let service: DebtListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebtListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
