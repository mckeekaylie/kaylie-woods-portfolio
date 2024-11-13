import { Routes } from '@angular/router';
import { UxProcessComponent } from './ux-process/ux-process.component';
import { HomeComponent } from './home/home.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';

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
    component: UxProcessComponent,
  },
  {
    path: 'case-studies',
    component: CaseStudiesComponent,
  },
];
