import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromclienteComponent } from './fromcliente.component';

describe('FromclienteComponent', () => {
  let component: FromclienteComponent;
  let fixture: ComponentFixture<FromclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FromclienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
