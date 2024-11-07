import { Routes } from '@angular/router';
import { UxProcessComponent } from './ux-process/ux-process.component';
import { HomeComponent } from './home/home.component';
import { MyWorkComponent } from './my-work/my-work.component';

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
    path: 'approach',
    component: UxProcessComponent,
  },
  {
    path: 'case-studies',
    component: UxProcessComponent,
  },
];
