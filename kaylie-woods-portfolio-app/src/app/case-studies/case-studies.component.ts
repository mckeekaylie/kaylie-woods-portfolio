import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CaseStudiesService } from '../services/case-studies.service';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss',
})
export class CaseStudiesComponent implements OnDestroy {
  onDestroy$: Subject<void> = new Subject();

  caseStudies$ = new BehaviorSubject<any>(null);

  @ViewChild('talentCommunities') sectionProrank!: ElementRef;

  constructor(private caseStudiesService: CaseStudiesService, private viewportScroller: ViewportScroller) {}

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

  scrollToSection(section: string) {
    this.viewportScroller.scrollToAnchor(section);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
