import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesPassionProjsComponent } from './challenges-passion-projs.component';

describe('ChallengesPassionProjsComponent', () => {
  let component: ChallengesPassionProjsComponent;
  let fixture: ComponentFixture<ChallengesPassionProjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengesPassionProjsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengesPassionProjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
