import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el año actual en el copyright', () => {
    const year = new Date().getFullYear();
    const copy = fixture.debugElement.query(By.css('.footer__copy')).nativeElement;
    expect(copy.textContent).toContain(`© ${year} Skandia`);
  });

  it('debería contener role="contentinfo"', () => {
    const footer = fixture.debugElement.query(By.css('footer')).nativeElement;
    expect(footer.getAttribute('role')).toBe('contentinfo');
  });

  it('debería renderizar la dirección completa', () => {
    const address = fixture.debugElement.query(By.css('.footer__address')).nativeElement;
    expect(address.textContent).toContain('Bogotá D.C., Colombia');
    expect(address.textContent).toContain('PBX');
    expect(address.textContent).toContain('Línea nacional');
  });

  it('debería contener 7 enlaces legales', () => {
    const links = fixture.debugElement.queryAll(By.css('.footer__list li a'));
    expect(links.length).toBe(7);
  });

  it('debería contener íconos de redes sociales con aria-labels correctos', () => {
    const facebook = fixture.debugElement.query(By.css('[aria-label="Facebook"]'));
    const instagram = fixture.debugElement.query(By.css('[aria-label="Instagram"]'));
    const youtube = fixture.debugElement.query(By.css('[aria-label="YouTube"]'));

    expect(facebook).toBeTruthy();
    expect(instagram).toBeTruthy();
    expect(youtube).toBeTruthy();
  });

  it('debería contener el logo con alt="Skandia"', () => {
    const logo = fixture.debugElement.query(By.css('.footer__logo')).nativeElement;
    expect(logo.getAttribute('alt')).toBe('Skandia');
  });
});

