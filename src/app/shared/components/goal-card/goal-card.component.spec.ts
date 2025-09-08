import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalCardComponent } from './goal-card.component';
import { By } from '@angular/platform-browser';

describe('GoalCardComponent', () => {
  let component: GoalCardComponent;
  let fixture: ComponentFixture<GoalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GoalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el título del objetivo', () => {
    const title = fixture.debugElement.query(By.css('.goal-card__title')).nativeElement;
    expect(title.textContent).toContain('Conocer mi sobrino');
  });

  it('debería mostrar la categoría correctamente', () => {
    const category = fixture.debugElement.query(By.css('.goal-card__subtitle')).nativeElement;
    expect(category.textContent).toContain('Bienestar');
  });

  it('debería mostrar la fecha del objetivo', () => {
    const date = fixture.debugElement.query(By.css('.fecha')).nativeElement;
    expect(date.textContent).toContain('Diciembre/2022');
  });

  it('debería mostrar el valor meta formateado en pesos colombianos', () => {
    const target = fixture.debugElement.query(By.css('.meta')).nativeElement;
    expect(target.textContent).toContain('$6.000.000');
  });

  it('debería mostrar el valor actual como $0', () => {
    const current = fixture.debugElement.query(By.css('.total')).nativeElement;
    expect(current.textContent).toContain('$0');
  });

  it('debería contener el mensaje de progreso', () => {
    const progress = fixture.debugElement.query(By.css('.goal-card__progress')).nativeElement;
    expect(progress.textContent).toContain('¡Asocia productos para monitorear su progreso!');
  });

  it('debería tener role="region" y aria-label="Tarjeta objetivo"', () => {
    const region = fixture.debugElement.query(By.css('.goal-card')).nativeElement;
    expect(region.getAttribute('role')).toBe('region');
    expect(region.getAttribute('aria-label')).toBe('Tarjeta objetivo');
  });

  it('debería renderizar el footer con el monto y título del objetivo', () => {
    const footer = fixture.debugElement.query(By.css('.goal-footer')).nativeElement;
    expect(footer.textContent).toContain('¡Vamos por esos');
    expect(footer.textContent).toContain('$6.000.000');
    expect(footer.textContent).toContain('Conocer mi sobrino');
  });
});

