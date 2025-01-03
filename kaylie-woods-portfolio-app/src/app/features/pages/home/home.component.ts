import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyJourney, MySkills } from '@app/shared/enum';
import { HomeService } from '@app/core/services/home.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HeroComponent } from '@app/shared/components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  myJourneyTxt = MyJourney;
  skillsTxt = MySkills;

  onDestroy$ = new Subject<void>();

  imageUrl = 'assets/images/home/bkgd-home.png';

  ideateSkills$ = new BehaviorSubject<string[]>([]);
  designSkills$ = new BehaviorSubject<string[]>([]);
  buildSkills$ = new BehaviorSubject<string[]>([]);

  constructor(
    private homeService: HomeService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);

    this.homeService
      .getSkills()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.ideateSkills$.next(data.ideate);
        this.designSkills$.next(data.design);
        this.buildSkills$.next(data.build);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
