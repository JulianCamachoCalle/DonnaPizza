import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudpromocionesusuariosComponent } from './crudpromocionesusuarios.component';

describe('CrudpromocionesusuariosComponent', () => {
  let component: CrudpromocionesusuariosComponent;
  let fixture: ComponentFixture<CrudpromocionesusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudpromocionesusuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudpromocionesusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
