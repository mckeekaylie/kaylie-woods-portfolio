import { Component } from '@angular/core';
import {
  MyApproachSections,
  MyApproachService,
} from '../services/my-approach.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'my-approach',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './my-approach.component.html',
  styleUrl: './my-approach.component.scss',
})
export class MyApproachComponent {
  onDestroy$: Subject<void> = new Subject();

  heroTitle = "My Approach"
  imageUrl = "assets/images/my-approach/bkgd-my-approach.png";

  myApproachData$ = new BehaviorSubject<MyApproachSections[] | null>(null);
  
  constructor(private myApproachService: MyApproachService, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);

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
