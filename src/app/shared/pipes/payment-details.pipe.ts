import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';

@Pipe({
  name: 'paymentDetails'
})
export class PaymentDetailsPipe implements PipeTransform {

  transform(value?: ConfirmationToken['payment_method_preview'], ...args: unknown[]): unknown {
    if(value?.card){
      const {brand ,exp_month,exp_year,last4} = value?.card;
      return `${brand.toLocaleUpperCase()} **** **** **** ${last4}, EXP: ${exp_month}/${exp_year}`;
    } else return `unknown payment method`; 
  }

}
