import { Component } from '@angular/core';
import {
  MyApproachSections,
  MyApproachService,
} from '../services/my-approach.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ux-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ux-process.component.html',
  styleUrl: './ux-process.component.scss',
})
export class UxProcessComponent {
  onDestroy$: Subject<void> = new Subject();

  myApproachData$ = new BehaviorSubject<MyApproachSections[] | null>(null);
  constructor(private myApproachService: MyApproachService) {}

  ngOnInit() {
    this.myApproachService
      .getMyApproach()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.myApproachData$.next(data);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
