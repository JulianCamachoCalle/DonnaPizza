import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudpagosComponent } from './crudpagos.component';

describe('CrudpagosComponent', () => {
  let component: CrudpagosComponent;
  let fixture: ComponentFixture<CrudpagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudpagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
