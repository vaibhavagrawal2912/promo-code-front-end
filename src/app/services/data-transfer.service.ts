import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private BASE_URL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  genratePromoCode(ammount, expiryTime, promoCodeRadius, promoCodeActivation) {
    return this.http.get(`${this.BASE_URL}/genratePromoCode`, {
      params: {
        ammount: ammount,
        expiryTime: expiryTime,
        promoCodeRadius: promoCodeRadius,
        promoCodeActivation: promoCodeActivation
      }
    });
  }
  getAllPromoCodes(onlyActive = undefined) {
    return this.http.get(`${this.BASE_URL}/getAllPromoCodes`, {
      params: {
        isActive: onlyActive
      }
    });
  }
  validatePromoCode(promoCode, origin, dest) {
    return this.http.get(`${this.BASE_URL}/validate`, {
      params: {
        code: promoCode,
        origin: origin,
        dest: dest
      }
    })
  }
}
