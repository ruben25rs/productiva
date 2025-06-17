import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements AfterViewInit {
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;
  @ViewChild('leftArrow') leftArrowRef!: ElementRef<HTMLElement>;
  @ViewChild('rightArrow') rightArrowRef!: ElementRef<HTMLElement>;

  private isDragStart = false;
  private isDragging = false;
  private prevPageX = 0;
  private prevScrollLeft = 0;
  private positionDiff = 0;

  ngAfterViewInit(): void {
    const carousel = this.carouselRef.nativeElement;
    const videos = carousel.querySelectorAll('video');
    const firstVideo = videos[0];
    const leftArrow = this.leftArrowRef.nativeElement;
    const rightArrow = this.rightArrowRef.nativeElement;

    const showHideIcons = () => {
      const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
      leftArrow.style.display = carousel.scrollLeft === 0 ? 'none' : 'block';
      rightArrow.style.display = carousel.scrollLeft >= scrollWidth ? 'none' : 'block';
    };

    const autoSlide = () => {
      if (
        carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
        carousel.scrollLeft <= 0
      ) return;

      this.positionDiff = Math.abs(this.positionDiff);
      const videoWidth = firstVideo.clientWidth + 14;
      const valDifference = videoWidth - this.positionDiff;

      if (carousel.scrollLeft > this.prevScrollLeft) {
        carousel.scrollLeft += this.positionDiff > videoWidth / 3 ? valDifference : -this.positionDiff;
      } else {
        carousel.scrollLeft -= this.positionDiff > videoWidth / 3 ? valDifference : -this.positionDiff;
      }
    };

    const dragStart = (e: MouseEvent | TouchEvent) => {
      this.isDragStart = true;
      this.prevPageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
      this.prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e: MouseEvent | TouchEvent) => {
      if (!this.isDragStart) return;
      e.preventDefault();
      this.isDragging = true;
      carousel.classList.add('dragging');
      this.positionDiff = (e instanceof MouseEvent ? e.pageX : e.touches[0].pageX) - this.prevPageX;
      carousel.scrollLeft = this.prevScrollLeft - this.positionDiff;
      showHideIcons();
    };

    const dragStop = () => {
      this.isDragStart = false;
      carousel.classList.remove('dragging');

      if (!this.isDragging) return;
      this.isDragging = false;
      autoSlide();
    };

    leftArrow.addEventListener('click', () => {
      const width = firstVideo.clientWidth + 14;
      carousel.scrollLeft -= width;
      setTimeout(() => showHideIcons(), 60);
    });

    rightArrow.addEventListener('click', () => {
      const width = firstVideo.clientWidth + 14;
      carousel.scrollLeft += width;
      setTimeout(() => showHideIcons(), 60);
    });

    // Drag events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    document.addEventListener('mousemove', dragging);
    carousel.addEventListener('touchmove', dragging);
    document.addEventListener('mouseup', dragStop);
    carousel.addEventListener('touchend', dragStop);

    showHideIcons();
  }
}
