import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Renderer2 } from '@angular/core';
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
        animate(
          '0.3s ease-out',
          style({
            transform: 'translateX({{end}}20%)',
            opacity: 0,
            visibility: 'hidden',
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
  @ViewChild('carouselParentDiv') carouselParentDiv!: ElementRef;

  @ViewChild('imageElement') imageElement!: ElementRef;
  @ViewChildren('slideWrapper') slideWrapper!: QueryList<any>;
  @ViewChild('slideWrapper') slideWrapperRef!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const slideWrapperRect =
        this.slideWrapperRef.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(
        this.slideWrapperRef.nativeElement,
        'height',
        slideWrapperRect,
      );
      this.updateImageSize();
    }, 100);
  }

  updateImageSize(previousElement?: number): void {
    // hide the slide that was visible prior to changing slides
    if (previousElement) {
      const previous = this.slideWrapper.get(previousElement);

      this.renderer.setStyle(previous.nativeElement, 'height', 0);
    }

    // show the current slide and set its height
    const imageRect = this.imageElement.nativeElement.getBoundingClientRect();
    const current = this.slideWrapper.get(this.currentSlide);

    this.renderer.removeStyle(current.nativeElement, 'height'); // Remove the previous inline style added by renderer
    this.renderer.setStyle(current.nativeElement, 'height', imageRect.height);
  }

  public onNavigate(dir: 'left' | 'right'): void {
    this.lastDirection = dir;

    const previousElement = this.currentSlide;

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

    this.updateImageSize(previousElement);
  }
}
