import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CarouselImg } from '@app/core/services/my-work.service';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('carouselAnimation', [
      state('void', style({ opacity: 0.5 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [animate('1s ease-in')]),
      transition(':leave', [animate('1s ease-out')]),
    ]),
  ],
})
export class CarouselComponent implements AfterViewInit {
  @Input() carouselImgs: CarouselImg[] = [];

  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;
  @ViewChild('imageElWrapper') imageElWrapper!: ElementRef<HTMLImageElement>;

  currentSlide = 0;
  contentHeight = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateContentHeight();
    }, 500);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateContentHeight();
  }

  updateContentHeight() {
    this.contentHeight =
      this.imageElement.nativeElement.getBoundingClientRect().height;
  }

  onPrevious() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.carouselImgs.length - 1 : previous;
  }

  onNext() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.carouselImgs.length ? 0 : next;
  }
}
