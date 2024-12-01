import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesProjsComponent } from './challenges-projs.component';

describe('ChallengesProjsComponent', () => {
  let component: ChallengesProjsComponent;
  let fixture: ComponentFixture<ChallengesProjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengesProjsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengesProjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
