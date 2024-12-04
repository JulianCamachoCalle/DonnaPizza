import { TestBed } from '@angular/core/testing';

import { PizzasFamiliaresService } from './pizzasfamiliares.service';

describe('PizzasfamiliaresService', () => {
  let service: PizzasFamiliaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzasFamiliaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
