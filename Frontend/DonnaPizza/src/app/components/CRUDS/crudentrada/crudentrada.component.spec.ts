import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudentradaComponent } from './crudentrada.component';

describe('CrudentradaComponent', () => {
  let component: CrudentradaComponent;
  let fixture: ComponentFixture<CrudentradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudentradaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudentradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
