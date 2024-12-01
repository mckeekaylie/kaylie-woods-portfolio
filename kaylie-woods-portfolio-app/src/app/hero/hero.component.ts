import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {

  @Input() imageUrl: string = '';
  @Input() heroTitle: string = '';

  isHome: boolean = false;
  isMyWork: boolean = false;
  isCaseStudies: boolean = false;
  isMyApproach: boolean = false;

  constructor(private viewportScroller: ViewportScroller, private router: Router) {}

  ngOnInit() {
    if(this.router.url === '/') {
      this.isHome = true;
    }

    if(this.router.url === '/my-work') {
      this.isMyWork = true;
    }

    if(this.router.url === '/case-studies') {
      this.isCaseStudies = true;
    }

    if(this.router.url === '/my-approach') {
      this.isMyApproach = true;
    }
  }

  scrollToSection(section: string) {
    this.viewportScroller.scrollToAnchor(section);
  }
}
