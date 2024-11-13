import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CaseStudiesService } from '../services/case-studies.service';
import { CommonModule } from '@angular/common';

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

  constructor(private caseStudiesService: CaseStudiesService) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    this.caseStudiesService
      .getCaseStudies()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.caseStudies$.next(data);
        console.log(data);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
