import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [animate('1s ease-in'), style({ opacity: 1 })]),
    ]),
  ],
})

export class AppComponent {
  constructor(private router: Router) {}
  title = 'kaylie-woods-portfolio-app';

  getRouteAnimationData() {
    return this.router.url;
  }
}
