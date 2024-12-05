import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudmetodopagoComponent } from './crudmetodopago.component';

describe('CrudmetodopagoComponent', () => {
  let component: CrudmetodopagoComponent;
  let fixture: ComponentFixture<CrudmetodopagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudmetodopagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudmetodopagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
