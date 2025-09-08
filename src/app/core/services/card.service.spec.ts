import { TestBed } from '@angular/core/testing';
import { CardService, CardData } from './card.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CardService', () => {
  let service: CardService;
  let httpMock: HttpTestingController;

  const mockResponse = {
    listCard: [
      {
        nameProduct: 'Fondo de inversión',
        numberProduct: '12345',
        balanceProduct: '500000',
        detaildProduct: 'Detalle del producto'
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService]
    });

    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya llamadas pendientes
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería hacer una petición GET y retornar los datos esperados', () => {
    service.getCards().subscribe((res) => {
      expect(res.listCard.length).toBe(1);
      expect(res.listCard[0].nameProduct).toBe('Fondo de inversión');
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});

