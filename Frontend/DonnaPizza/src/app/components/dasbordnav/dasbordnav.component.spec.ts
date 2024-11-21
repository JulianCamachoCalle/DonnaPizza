import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasbordnavComponent } from './dasbordnav.component';

describe('DasbordnavComponent', () => {
  let component: DasbordnavComponent;
  let fixture: ComponentFixture<DasbordnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasbordnavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasbordnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
