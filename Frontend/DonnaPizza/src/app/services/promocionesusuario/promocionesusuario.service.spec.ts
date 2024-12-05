import { TestBed } from '@angular/core/testing';

import { PromocionesusuarioService } from '../promocionesusuario/promocionesusuario.service';

describe('PromocionesusuarioService', () => {
  let service: PromocionesusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromocionesusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
