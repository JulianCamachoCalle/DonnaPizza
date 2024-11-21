import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudclienteComponent } from './crudcliente.component';

describe('CrudclienteComponent', () => {
  let component: CrudclienteComponent;
  let fixture: ComponentFixture<CrudclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudclienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
