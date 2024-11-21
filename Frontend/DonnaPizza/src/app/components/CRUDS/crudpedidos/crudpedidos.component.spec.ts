import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDPedidosComponent } from './crudpedidos.component';

describe('CRUDPedidosComponent', () => {
  let component: CRUDPedidosComponent;
  let fixture: ComponentFixture<CRUDPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRUDPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
