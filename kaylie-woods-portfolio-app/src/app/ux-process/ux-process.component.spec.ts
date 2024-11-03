import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UxProcessComponent } from './ux-process.component';

describe('UxProcessComponent', () => {
  let component: UxProcessComponent;
  let fixture: ComponentFixture<UxProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UxProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UxProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
