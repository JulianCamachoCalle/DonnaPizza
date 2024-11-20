import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerlocalComponent } from './primerlocal.component';

describe('PrimerlocalComponent', () => {
  let component: PrimerlocalComponent;
  let fixture: ComponentFixture<PrimerlocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimerlocalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimerlocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
