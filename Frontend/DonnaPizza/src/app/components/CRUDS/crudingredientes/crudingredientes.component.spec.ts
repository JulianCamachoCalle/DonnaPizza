import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudingredientesComponent } from './crudingredientes.component';

describe('CrudingredientesComponent', () => {
  let component: CrudingredientesComponent;
  let fixture: ComponentFixture<CrudingredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudingredientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudingredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
