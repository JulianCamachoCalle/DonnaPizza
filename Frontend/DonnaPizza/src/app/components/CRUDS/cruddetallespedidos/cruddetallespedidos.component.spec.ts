import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDdetallespedidosComponent } from './cruddetallespedidos.component';

describe('CRUDdetallespedidosComponent', () => {
  let component: CRUDdetallespedidosComponent;
  let fixture: ComponentFixture<CRUDdetallespedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDdetallespedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRUDdetallespedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
