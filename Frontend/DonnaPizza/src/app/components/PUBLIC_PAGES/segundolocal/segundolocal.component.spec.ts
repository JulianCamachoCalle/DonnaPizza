import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundolocalComponent } from './segundolocal.component';

describe('SegundolocalComponent', () => {
  let component: SegundolocalComponent;
  let fixture: ComponentFixture<SegundolocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundolocalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundolocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
