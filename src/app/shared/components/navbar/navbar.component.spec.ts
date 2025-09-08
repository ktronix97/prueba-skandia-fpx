import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir toggleSidenav al hacer click en el botón de menú', () => {
    spyOn(component.toggleSidenav, 'emit');
    const menuBtn = fixture.debugElement.query(By.css('.navbar__menu'));
    menuBtn.nativeElement.click();
    expect(component.toggleSidenav.emit).toHaveBeenCalled();
  });

  it('debería alternar dashboardActive y emitir dashboardToggle', () => {
    spyOn(component.dashboardToggle, 'emit');
    expect(component.dashboardActive).toBeFalse();

    component.onDashboardClick();
    expect(component.dashboardActive).toBeTrue();
    expect(component.dashboardToggle.emit).toHaveBeenCalledWith(true);

    component.onDashboardClick();
    expect(component.dashboardActive).toBeFalse();
    expect(component.dashboardToggle.emit).toHaveBeenCalledWith(false);
  });

  it('debería contener enlaces con texto correcto', () => {
    const plannerLink = fixture.debugElement.query(By.css('[href="#planner"]'));
    const aportesLink = fixture.debugElement.query(By.css('[href="#usuario"]'));

    expect(plannerLink.nativeElement.textContent).toContain('Tu Financial Planner');
    expect(aportesLink.nativeElement.textContent).toContain('Aportes');
  });

  it('debería tener botón de ayuda con aria-label correcto', () => {
    const helpBtn = fixture.debugElement.query(By.css('[aria-label="Ayuda"]'));
    expect(helpBtn).toBeTruthy();
  });
});

