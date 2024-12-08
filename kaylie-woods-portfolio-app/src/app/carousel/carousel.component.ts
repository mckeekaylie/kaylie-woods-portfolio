import { animate, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CarouselImg } from '../services/my-work.service';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('carouselAnimation', [
      transition(':enter', [animate('2s ease-in')]),
      transition(':leave', [animate('2s ease-out')]),
    ]),
  ],
})
export class CarouselComponent implements AfterViewInit {
  @Input() carouselImgs: Array<CarouselImg> = [];

  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;
  @ViewChild('imageElWrapper') imageElWrapper!: ElementRef<HTMLImageElement>;

  currentSlide = 0;
  contentHeight = 0;

  constructor() {}

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
