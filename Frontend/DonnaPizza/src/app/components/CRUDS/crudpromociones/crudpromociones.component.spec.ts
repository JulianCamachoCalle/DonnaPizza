import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudpromocionesComponent } from './crudpromociones.component';

describe('CrudpromocionesComponent', () => {
  let component: CrudpromocionesComponent;
  let fixture: ComponentFixture<CrudpromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudpromocionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudpromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
