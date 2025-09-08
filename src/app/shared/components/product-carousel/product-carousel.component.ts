import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService, CardData } from '../../../core/services/card.service';

type CardVM = CardData & { balanceProductNum: number };

@Component({
  selector: 'app-card-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('viewport', { static: false }) viewport!: ElementRef<HTMLDivElement>;

  cards: CardVM[] = [];
  loading = true;
  error = '';
  goalName = 'Conocer mi sobrino';
  atStart = true;
  atEnd = false;
  showRecommendation = false;

  constructor(private cardService: CardService) {}

    toggleRecommendation() {
      this.showRecommendation = !this.showRecommendation;
    }

  ngOnInit(): void {
    this.cardService.getCards().subscribe({
      next: (res) => {
        const list: CardData[] = (res as any)?.listCard ?? [];
        this.cards = list.map((c) => ({
          ...c,
          balanceProductNum: Number((c as any).balanceProduct ?? 0)
        }));
        this.loading = false;
        requestAnimationFrame(() => this.updateNavState());
      },
      error: () => {
        this.error = 'No pudimos cargar tus productos. Intenta nuevamente.';
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.updateNavState());
  }

  @HostListener('window:resize')
  onResize() { this.updateNavState(); }

  private step(): number {
    const vp = this.viewport?.nativeElement;
    if (!vp) return 0;
    const slide = vp.querySelector<HTMLElement>('.pc-slide');
    if (!slide) return 0;
    const rail = vp.querySelector<HTMLElement>('.pc__rail') || vp;
    const gap = parseFloat(getComputedStyle(rail).gap || '0');
    return slide.getBoundingClientRect().width + gap;
  }

  private clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(n, max));
  }

  private updateNavState() {
    const vp = this.viewport?.nativeElement;
    if (!vp) return;
    const tol = 1;
    const maxLeft = Math.max(0, vp.scrollWidth - vp.clientWidth);
    this.atStart = vp.scrollLeft <= tol;
    this.atEnd = vp.scrollLeft >= maxLeft - tol;
  }

  private go(sign: 1 | -1) {
    const vp = this.viewport?.nativeElement;
    if (!vp) return;
    const s = this.step();
    const maxLeft = vp.scrollWidth - vp.clientWidth;
    const target = this.clamp(vp.scrollLeft + sign * s, 0, maxLeft);
    vp.scrollTo({ left: target, behavior: 'smooth' });
    setTimeout(() => this.updateNavState(), 220);
  }

  next() { this.go(1); }
  prev() { this.go(-1); }
  onViewportScroll() { this.updateNavState(); }

  trackByIndex = (i: number) => i;
  getLabel = (c: CardVM) => /seguro/i.test(c.nameProduct) ? 'Tu ahorro actual:' : 'Ya cuentas con:';
}
