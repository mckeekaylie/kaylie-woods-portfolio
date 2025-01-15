import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CarouselImg } from '@app/core/services/my-work.service';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  encapsulation: ViewEncapsulation.Emulated,

  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({
          transform: 'translateX({{start}}20%)',
          opacity: 0,
          visibility: 'hidden',
        }),
        animate(
          '0.3s 0.3s ease-out',
          style({
            opacity: 1,
            visibility: 'visible',
            transform: 'translateX(0)',
          }),
        ),
      ]),
      transition('* => void', [
        style({
          opacity: 0,
          visibility: 'hidden',
          transform: 'translateX(0)',
        }),
        animate(
          '0.3s ease-out',
          style({ transform: 'translateX({{end}}20%)' }),
        ),
      ]),
    ]),
  ],
})
export class CarouselComponent {
  @Input() carouselImgs: CarouselImg[] = [];

  currentSlide = 0;

  lastDirection: 'left' | 'right' | 'none' = 'none';

  public onNavigate(dir: 'left' | 'right'): void {
    this.lastDirection = dir;
    switch (dir) {
      case 'left':
        if (this.currentSlide === 0) {
          this.currentSlide = this.carouselImgs.length - 1;
        } else {
          this.currentSlide = this.currentSlide - 1;
        }
        break;
      case 'right':
        if (this.currentSlide === this.carouselImgs.length - 1) {
          this.currentSlide = 0;
        } else {
          this.currentSlide = this.currentSlide + 1;
        }
    }
  }
}
