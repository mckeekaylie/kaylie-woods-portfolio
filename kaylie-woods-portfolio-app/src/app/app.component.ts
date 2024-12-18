import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavComponent } from '@app/shared/components/nav/nav.component';
import { FooterComponent } from '@app/shared/components/footer/footer.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, FooterComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimation', [
      transition('* => *', [
        style({ backgroundColor: 'black', opacity: 0.9 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  showScrollButton = false;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {}

  title = 'kaylie-woods-portfolio-app';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 1000;
  }

  getRouteAnimationData() {
    return this.router.url;
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
