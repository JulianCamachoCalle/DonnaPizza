import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasFormComponent } from './pizzas-form.component';

describe('PizzasFormComponent', () => {
  let component: PizzasFormComponent;
  let fixture: ComponentFixture<PizzasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
