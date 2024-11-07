import { Component } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MyWorkService, myJobs } from '../services/my-work.service';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { ChallengesPassionProjsComponent } from '../challenges-passion-projs/challenges-passion-projs.component';

@Component({
  selector: 'my-work',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    FooterComponent,
    ChallengesPassionProjsComponent,
  ],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss',
})
export class MyWorkComponent {
  onDestroy$: Subject<void> = new Subject();

  proRank = {} as myJobs;
  genesys = {} as myJobs;
  tcc = {} as myJobs;

  constructor(private myWorkService: MyWorkService) {}

  ngOnInit() {
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

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
