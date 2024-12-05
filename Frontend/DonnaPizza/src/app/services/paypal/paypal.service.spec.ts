import { TestBed } from '@angular/core/testing';

import { PayPalService } from '../paypal/paypal.service';

describe('PaypalService', () => {
  let service: PayPalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayPalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
