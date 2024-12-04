import { TestBed } from '@angular/core/testing';

import { IngredienesService } from '../ingrediente/ingredienes.service';

describe('IngredienesService', () => {
  let service: IngredienesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredienesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
