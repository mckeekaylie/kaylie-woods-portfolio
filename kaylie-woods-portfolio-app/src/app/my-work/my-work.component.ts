import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MyWorkService, myJobs } from '../services/my-work.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ChallengesPassionProjsComponent } from '../challenges-passion-projs/challenges-passion-projs.component';

@Component({
  selector: 'my-work',
  standalone: true,
  imports: [
    CommonModule,
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

  @ViewChild('prorank') sectionProrank!: ElementRef;
  @ViewChild('genesys') sectionGenesys!: ElementRef;
  @ViewChild('tcc') sectionTcc!: ElementRef;
  @ViewChild('challenges') sectionChallenges!: ElementRef;

  constructor(private myWorkService: MyWorkService, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.viewportScroller.setOffset([0, 100]);
    window.scrollTo(0, 0);
    
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

  scrollToSection(section: string) {
    this.viewportScroller.scrollToAnchor(section);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
