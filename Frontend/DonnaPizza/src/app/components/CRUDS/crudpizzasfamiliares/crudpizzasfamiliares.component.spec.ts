import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudpizzasfamiliaresComponent } from './crudpizzasfamiliares.component';

describe('CrudpizzasfamiliaresComponent', () => {
  let component: CrudpizzasfamiliaresComponent;
  let fixture: ComponentFixture<CrudpizzasfamiliaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudpizzasfamiliaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudpizzasfamiliaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
