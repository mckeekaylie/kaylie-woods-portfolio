import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import {
  CaseStudies,
  CaseStudiesService,
} from '@app/core/services/case-studies.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HeroComponent } from '@app/shared/components/hero/hero.component';
import { CarouselComponent } from '@app/shared/components/carousel/carousel.component';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, HeroComponent, CarouselComponent, LoaderComponent],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss',
})
export class CaseStudiesComponent implements OnInit, AfterViewInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  loading$ = new Subject<boolean>();

  heroTitle = 'Case Studies';
  imageUrl = 'assets/images/case-studies/bkgd-case-studies.png';

  caseStudies$ = new BehaviorSubject<CaseStudies[]>([]);

  constructor(
    private caseStudiesService: CaseStudiesService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.viewportScroller.setOffset([0, 100]);

    this.caseStudiesService
      .getCaseStudies()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.caseStudies$.next(data);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading$.next(false);
    }, 2500);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
