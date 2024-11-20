import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaListComponentComponent } from './pizza-list-component.component';

describe('PizzaListComponentComponent', () => {
  let component: PizzaListComponentComponent;
  let fixture: ComponentFixture<PizzaListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
