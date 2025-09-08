import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCarouselComponent } from './product-carousel.component';
import { CardService } from '../../../core/services/card.service';
import { of, throwError } from 'rxjs';

describe('ProductCarouselComponent', () => {
  let component: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;
  let mockCardService: jasmine.SpyObj<CardService>;

  beforeEach(() => {
    mockCardService = jasmine.createSpyObj('CardService', ['getCards']);

    TestBed.configureTestingModule({
      imports: [ProductCarouselComponent],
      providers: [{ provide: CardService, useValue: mockCardService }]
    });

    fixture = TestBed.createComponent(ProductCarouselComponent);
    component = fixture.componentInstance;
  });

  it('debería mostrar skeletons cuando loading es true', () => {
    component.loading = true;
    fixture.detectChanges();
    const skeletons = fixture.nativeElement.querySelectorAll('.pc-skel');
    expect(skeletons.length).toBe(3);
  });

  it('debería mostrar mensaje de error si falla el servicio', () => {
    mockCardService.getCards.and.returnValue(throwError(() => new Error('Error')));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.error).toContain('No pudimos cargar tus productos');
    const errorMsg = fixture.nativeElement.querySelector('.pc__error');
    expect(errorMsg).toBeTruthy();
  });

  it('debería renderizar cards si hay datos', () => {
    const mockCards = [
      { nameProduct: 'Fondo', numberProduct: '123', balanceProduct: '5000', detaildProduct: 'Detalle' }
    ];
    mockCardService.getCards.and.returnValue(of({ listCard: mockCards }));
    component.ngOnInit();
    fixture.detectChanges();
    const cardTitle = fixture.nativeElement.querySelector('.pc-card__title');
    expect(cardTitle.textContent).toContain('Fondo');
  });

  it('debería alternar showRecommendation al hacer toggle', () => {
    expect(component.showRecommendation).toBeFalse();
    component.toggleRecommendation();
    expect(component.showRecommendation).toBeTrue();
  });

  it('debería retornar etiqueta correcta con getLabel()', () => {
    const seguro = { nameProduct: 'Seguro Vida' } as any;
    const fondo = { nameProduct: 'Fondo Inversión' } as any;
    expect(component.getLabel(seguro)).toBe('Tu ahorro actual:');
    expect(component.getLabel(fondo)).toBe('Ya cuentas con:');
  });

  it('debería retornar índice con trackByIndex()', () => {
    expect(component.trackByIndex(2)).toBe(2);
  });

  it('debería calcular clamp correctamente', () => {
    expect(component['clamp'](10, 0, 20)).toBe(10);
    expect(component['clamp'](-5, 0, 20)).toBe(0);
    expect(component['clamp'](25, 0, 20)).toBe(20);
  });

  it('debería navegar con next() y prev()', () => {
    spyOn(component as any, 'go');
    component.next();
    expect((component as any).go).toHaveBeenCalledWith(1);
    component.prev();
    expect((component as any).go).toHaveBeenCalledWith(-1);
  });
});

