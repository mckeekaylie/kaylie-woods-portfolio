import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import {
  CaseStudies,
  CaseStudiesService,
} from '../services/case-studies.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, HeroComponent, CarouselComponent],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss',
})
export class CaseStudiesComponent implements OnDestroy {
  onDestroy$: Subject<void> = new Subject();

  heroTitle = 'Case Studies';
  imageUrl = 'assets/images/case-studies/bkgd-case-studies.png';

  caseStudies$ = new BehaviorSubject<CaseStudies[]>([]);

  @ViewChild('talentCommunities') sectionProrank!: ElementRef;

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

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
