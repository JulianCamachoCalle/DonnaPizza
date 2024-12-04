import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudpastasComponent } from './crudpastas.component';

describe('CrudpastasComponent', () => {
  let component: CrudpastasComponent;
  let fixture: ComponentFixture<CrudpastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudpastasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudpastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
