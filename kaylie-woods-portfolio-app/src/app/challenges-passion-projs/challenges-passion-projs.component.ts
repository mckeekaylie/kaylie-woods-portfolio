import { Component } from '@angular/core';
import { ChallengesProjsService } from '../services/challenges-projs.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'challenges-passion-projs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenges-passion-projs.component.html',
  styleUrl: './challenges-passion-projs.component.scss',
})
export class ChallengesPassionProjsComponent {
  onDestroy$: Subject<void> = new Subject();
  challengesProjs$ = new BehaviorSubject<any>(null);

  constructor(private challengesProjsService: ChallengesProjsService) {}

  ngOnInit() {
    this.challengesProjsService
      .getChallengesProjs()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.challengesProjs$.next(data);
      });
  }
}
