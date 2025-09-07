import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from '../../shared/components/goal-card/goal-card.component';
import { ProductCarouselComponent } from '../../shared/components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GoalCardComponent, ProductCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('homeRoot', { static: false }) homeRoot!: ElementRef<HTMLElement>;
  @ViewChild('goalCardWrap', { static: false }) goalCardWrap!: ElementRef<HTMLElement>;
  @ViewChild('imagenDos', { static: false }) imagenDos!: ElementRef<HTMLElement>;
  @ViewChild('bgImagenDos', { static: false }) bgImagenDos!: ElementRef<HTMLElement>;

  private resizeHandler = this.recalc.bind(this);
  private loadHandler = this.recalc.bind(this);
  private ro?: ResizeObserver;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.recalc();

    window.addEventListener('resize', this.resizeHandler, { passive: true });
    window.addEventListener('load', this.loadHandler, { passive: true });

    this.ro = new ResizeObserver(() => this.recalc());
    const watchEl =
      (this.goalCardWrap?.nativeElement.querySelector('.goal-card') as HTMLElement) ||
      this.goalCardWrap?.nativeElement;
    if (watchEl) this.ro.observe(watchEl);

    setTimeout(() => this.recalc(), 120);
    setTimeout(() => this.recalc(), 400);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('load', this.loadHandler);
    this.ro?.disconnect();
  }

  private recalc(): void {
    this.setCardHeightVar();
    this.setBgSpan();
  }

  private setCardHeightVar(): void {
    if (!this.homeRoot || !this.goalCardWrap) return;
    const cardEl =
      (this.goalCardWrap.nativeElement.querySelector('.goal-card') as HTMLElement) ||
      (this.goalCardWrap.nativeElement as HTMLElement);
    const h = Math.max(0, Math.round(cardEl.getBoundingClientRect().height));
    this.renderer.setStyle(this.homeRoot.nativeElement, '--card-h', `${h}px`);
  }

  private setBgSpan(): void {
    if (!this.homeRoot || !this.imagenDos || !this.bgImagenDos) return;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const homeTop = this.homeRoot.nativeElement.getBoundingClientRect().top + scrollY;
    const img2Top = this.imagenDos.nativeElement.getBoundingClientRect().top + scrollY;

    const footerEl =
      (document.querySelector('app-footer') as HTMLElement) ||
      (document.querySelector('footer.footer') as HTMLElement) ||
      (document.querySelector('footer') as HTMLElement);
    if (!footerEl) return;

    const footerTop = footerEl.getBoundingClientRect().top + scrollY;

    const topRelToHome = Math.max(0, img2Top - homeTop);
    const height = Math.max(0, footerTop - img2Top);

    this.renderer.setStyle(this.bgImagenDos.nativeElement, 'top', `${topRelToHome}px`);
    this.renderer.setStyle(this.bgImagenDos.nativeElement, 'height', `${height}px`);
  }
}
