import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Renderer2 } from '@angular/core';
import { GoalCardComponent } from '../../shared/components/goal-card/goal-card.component';
import { ProductCarouselComponent } from '../../shared/components/product-carousel/product-carousel.component';
import { ElementRef } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let renderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, GoalCardComponent, ProductCarouselComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    renderer = fixture.componentRef.injector.get(Renderer2);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar recalc en ngAfterViewInit', () => {
    const spyRecalc = spyOn(component as any, 'recalc');
    component.ngAfterViewInit();
    expect(spyRecalc).toHaveBeenCalled();
  });

  it('debería agregar listeners de resize y load en ngAfterViewInit', () => {
    spyOn(window, 'addEventListener');
    component.ngAfterViewInit();
    expect(window.addEventListener).toHaveBeenCalledWith('resize', jasmine.any(Function), { passive: true });
    expect(window.addEventListener).toHaveBeenCalledWith('load', jasmine.any(Function), { passive: true });
  });

  it('debería eliminar listeners en ngOnDestroy', () => {
    spyOn(window, 'removeEventListener');
    component.ngOnDestroy();
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', jasmine.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
  });

  it('debería aplicar estilo --card-h en setCardHeightVar', () => {
    const mockCard = document.createElement('div');
    mockCard.classList.add('goal-card');
    mockCard.style.height = '200px';
    document.body.appendChild(mockCard);

    component.homeRoot = new ElementRef(document.createElement('div'));
    component.goalCardWrap = new ElementRef(document.createElement('div'));
    component.goalCardWrap.nativeElement.appendChild(mockCard);

    const spySetStyle = spyOn(renderer, 'setStyle');
    component['setCardHeightVar']();
    expect(spySetStyle).toHaveBeenCalledWith(component.homeRoot.nativeElement, '--card-h', '200px');

    document.body.removeChild(mockCard);
  });

  it('debería aplicar estilos top y height en setBgSpan si footer existe', () => {
    const home = document.createElement('div');
    const imgDos = document.createElement('div');
    const bgDos = document.createElement('div');
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    document.body.appendChild(footer);

    component.homeRoot = new ElementRef(home);
    component.imagenDos = new ElementRef(imgDos);
    component.bgImagenDos = new ElementRef(bgDos);

    spyOn(renderer, 'setStyle');
    component['setBgSpan']();
    expect(renderer.setStyle).toHaveBeenCalledWith(bgDos, 'top', jasmine.any(String));
    expect(renderer.setStyle).toHaveBeenCalledWith(bgDos, 'height', jasmine.any(String));

    document.body.removeChild(footer);
  });
});


