import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDPizzasComponent } from './crudpizzas.component';

describe('CRUDPizzasComponent', () => {
  let component: CRUDPizzasComponent;
  let fixture: ComponentFixture<CRUDPizzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDPizzasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRUDPizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
