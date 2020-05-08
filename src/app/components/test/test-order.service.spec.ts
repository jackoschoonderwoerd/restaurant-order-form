import { TestBed } from '@angular/core/testing';

import { TestOrderService } from './test-order.service';

describe('TestOrderService', () => {
  let service: TestOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
