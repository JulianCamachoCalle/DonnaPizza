import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastasListComponentComponent } from './pastas-list-component.component';

describe('PastasListComponentComponent', () => {
  let component: PastasListComponentComponent;
  let fixture: ComponentFixture<PastasListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastasListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastasListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
