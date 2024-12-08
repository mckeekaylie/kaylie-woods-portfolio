import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MyWorkService, myJobs } from '@app/core/services/my-work.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ChallengesProjsComponent } from '@app/features/challenges-projs/challenges-projs.component';
import { HeroComponent } from '@app/shared/components/hero/hero.component';
import { CarouselComponent } from '@app/shared/components/carousel/carousel.component';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';

@Component({
  selector: 'my-work',
  standalone: true,
  imports: [
    CommonModule,
    ChallengesProjsComponent,
    HeroComponent,
    CarouselComponent,
    LoaderComponent,
  ],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss',
})
export class MyWorkComponent implements OnInit, AfterViewInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  loading$ = new Subject<boolean>();

  heroTitle = 'My Work';
  imageUrl = 'assets/images/my-work/bkgd-my-work.jpg';

  proRank = {} as myJobs;
  genesys = {} as myJobs;
  tcc = {} as myJobs;

  constructor(
    private myWorkService: MyWorkService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.viewportScroller.setOffset([0, 100]);

    this.myWorkService
      .getMyJobs()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        Object.assign(
          this.proRank,
          data.find((item) => item.employer === 'ProRank'),
        );
        Object.assign(
          this.genesys,
          data.find((item) => item.employer === 'Genesys'),
        );
        Object.assign(
          this.tcc,
          data.find((item) => item.employer === 'TCC Solutions'),
        );
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading$.next(false);
    }, 2500);
  }

  scrollToSection(section: string) {
    this.viewportScroller.scrollToAnchor(section);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
