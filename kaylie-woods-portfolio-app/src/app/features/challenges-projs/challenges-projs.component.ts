import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ChallengesProjs,
  ChallengesProjsService,
} from '@app/core/services/challenges-projs.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'challenges-projs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenges-projs.component.html',
  styleUrl: './challenges-projs.component.scss',
})
export class ChallengesProjsComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  challengesProjs$ = new BehaviorSubject<ChallengesProjs[]>([]);

  constructor(private challengesProjsService: ChallengesProjsService) {}

  ngOnInit() {
    this.challengesProjsService
      .getChallengesProjs()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.challengesProjs$.next(data);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
