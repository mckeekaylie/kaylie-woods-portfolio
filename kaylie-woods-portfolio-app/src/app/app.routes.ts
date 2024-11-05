import { Routes } from '@angular/router';
import { UxProcessComponent } from './ux-process/ux-process.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    { 
        path: 'approach', 
        component: UxProcessComponent 
    },
    {
        path: 'case-studies',
        component: UxProcessComponent
    }
];
