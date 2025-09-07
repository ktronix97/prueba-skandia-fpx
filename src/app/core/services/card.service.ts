import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CardData {
  nameProduct: string;
  numberProduct: string;
  balanceProduct: string;
  detaildProduct: string;
}
@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'https://62e152f8fa99731d75d44571.mockapi.io/api/v1/test-front-end-skandia/cards';

  constructor(private http: HttpClient) {}

  getCards(): Observable<{ listCard: CardData[] }> {
    return this.http.get<{ listCard: CardData[] }>(this.apiUrl);
  }
}
