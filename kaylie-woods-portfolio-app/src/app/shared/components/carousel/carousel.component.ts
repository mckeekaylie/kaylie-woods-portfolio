import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HostListener, Renderer2 } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
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
      transition(':enter', [
        style({
          transform: 'translateX({{start}}20%)',
          opacity: 0,
          height: 0,
        }),
        animate(
          '0.3s 0.3s ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1,
            height: '*',
          }),
        ),
      ]),
      transition(':leave', [
        style({ height: '*' }),
        animate(
          '0.3s ease-out',
          style({
            transform: 'translateX({{end}}20%)',
            opacity: 0,
            height: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class CarouselComponent implements AfterViewInit {
  @Input() carouselImgs: CarouselImg[] = [];

  currentSlide = 0;

  lastDirection: 'left' | 'right' | 'none' = 'none';

  @ViewChild('imageElement') imageElementRef!: ElementRef;
  @ViewChild('slideWrapper') slideWrapperRef!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateSize();
    }, 200);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateSize();
  }

  updateSize() {
    const imageElementRect =
      this.imageElementRef.nativeElement.getBoundingClientRect();

    this.renderer.setStyle(
      this.slideWrapperRef.nativeElement,
      'height',
      `${imageElementRect.height}px`,
    );
  }

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
