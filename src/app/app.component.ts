import { Component } from '@angular/core';
import { DataTransferService } from './services/data-transfer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public ammount;
  public expiryTime;
  public promoCode;
  public backendError;
  public allPromoCodes;
  public activePromoCodes;
  public promoCodeRadius;
  public promoCodeActivation = 'true';
  public testPromoCode;
  public origin;
  public dest;
  public validatedResponse

  constructor(private dataTransferService: DataTransferService) { }

  generatePromoCode = () => {
    this.activePromoCodes = this.allPromoCodes = this.backendError = void (0);
    console.log(this.ammount, this.expiryTime)
    this.dataTransferService.genratePromoCode(this.ammount, this.expiryTime, this.promoCodeRadius, this.promoCodeActivation).subscribe((response: any) => {
      console.log(response)
      if (response && response.code) {
        this.promoCode = response.code;
        setTimeout(_ => {
          this.promoCode = void (0)
        }, 2000)
      }
    }, (errorResponse) => {
      if (errorResponse.error) {
        console.error(errorResponse)
        this.backendError = errorResponse.error;
      }
    })
  }

  getAllPromoCodes = (onlyActive = undefined) => {
    this.dataTransferService.getAllPromoCodes(onlyActive).subscribe((response: any) => {
      this[onlyActive === undefined ? 'allPromoCodes' : 'activePromoCodes'] = response
    });
  }

  validatePromoCode = () => {
    this.dataTransferService.validatePromoCode(this.testPromoCode, this.origin, this.dest).subscribe((response: any) => {
      if (response) {
        this.validatedResponse = response;
      }
    })
  }
}
