import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar 6 elementos de menú', () => {
    const items = fixture.debugElement.queryAll(By.css('.menu__item'));
    expect(items.length).toBe(6);
  });

  it('cada ítem debería tener un ícono y una etiqueta', () => {
    const items = fixture.debugElement.queryAll(By.css('.menu__item'));
    items.forEach(item => {
      const icon = item.query(By.css('.menu__icon img'));
      const label = item.query(By.css('.menu__label'));
      expect(icon).toBeTruthy();
      expect(label).toBeTruthy();
    });
  });

  it('debería contener etiquetas esperadas en orden', () => {
    const labels = fixture.debugElement.queryAll(By.css('.menu__label')).map(el => el.nativeElement.textContent.trim());
    expect(labels).toEqual([
      'Inicio',
      'Contratos',
      'Acciones',
      'Objetivos',
      'Herramientas',
      'Servicio al cliente'
    ]);
  });

  it('debería tener estructura <nav> con clase sidebar__menu', () => {
    const nav = fixture.debugElement.query(By.css('nav.sidebar__menu'));
    expect(nav).toBeTruthy();
  });
});
