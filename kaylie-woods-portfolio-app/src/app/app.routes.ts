import { Routes } from '@angular/router';
import { MyApproachComponent } from '@app/features/pages/my-approach/my-approach.component';
import { HomeComponent } from '@app/features/pages/home/home.component';
import { MyWorkComponent } from '@app/features/pages/my-work/my-work.component';
import { CaseStudiesComponent } from '@app/features/pages/case-studies/case-studies.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'my-work',
    component: MyWorkComponent,
  },
  {
    path: 'my-approach',
    component: MyApproachComponent,
  },
  {
    path: 'case-studies',
    component: CaseStudiesComponent,
  },
];
