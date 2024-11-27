import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyWorkComponent } from '../my-work/my-work.component';
import { MyJourney, skills } from '../../enum';
import { ChallengesPassionProjsComponent } from '../challenges-passion-projs/challenges-passion-projs.component';
import { HomeService } from '../services/home.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MyWorkComponent,
    ChallengesPassionProjsComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  myJourneyTxt = MyJourney;
  skillsTxt = skills;

  onDestroy$: Subject<void> = new Subject();
  
  ideateSkills$ = new BehaviorSubject<string[]>([]);
  designSkills$ = new BehaviorSubject<string[]>([]);
  developSkills$ = new BehaviorSubject<string[]>([]);

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService
          .getSkills()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((data) => {
            this.ideateSkills$.next(data.ideate);
            this.designSkills$.next(data.design);
            this.developSkills$.next(data.develop);
          }
        );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}