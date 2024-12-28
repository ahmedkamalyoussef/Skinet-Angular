import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { OrderSummaryComponent } from "../../shared/components/order-summary/order-summary.component";
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { StripeService } from '../../core/services/stripe.service';
import { ConfirmationToken, StripeAddressElement, StripeAddressElementChangeEvent, StripePaymentElement, StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Address } from '../../shared/models/user';
import { AccountService } from '../../core/services/account.service';
import { firstValueFrom } from 'rxjs';
import { CheckoutDeliveryComponent } from "./checkout-delivery/checkout-delivery.component";
import { CheckoutReviewComponent } from "./checkout-review/checkout-review.component";
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-checkout',
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    MatButton,
    RouterLink,
    MatCheckboxModule,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CurrencyPipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private stripeService = inject(StripeService);
  private snackBar = inject(SnackbarService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  saveAddress = false;
  addressElement?: StripeAddressElement;
  paymentElement?: StripePaymentElement;
  cartService = inject(CartService);
  confirmationToken?: ConfirmationToken;
  completionState = signal<{ address: boolean, payment: boolean, delivery: boolean }>({ address: false, payment: false, delivery: false });
  isLoading = false;
  async ngOnInit(): Promise<void> {
    try {
      this.addressElement = await this.stripeService.createAddressElement();
      this.paymentElement = await this.stripeService.createPaymentElement();
      this.addressElement.mount('#address-element');
      this.paymentElement.mount('#payment-element');
      this.addressElement.on('change',this.handleAddressChange);
      this.paymentElement.on('change',this.handlePaymentChange);

    } catch (error: any) {
      this.snackBar.error(error.message);
    }
  }

  handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    this.completionState.update(state => ({...state,address:event.complete}));
  }

  handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    this.completionState.update(state => ({...state,payment:event.complete}));
  }

  handleDeliveryChange = (event: boolean) => {
    this.completionState.update(state => ({...state,delivery:event}));
  }

  onSaveAddressCheckboxChange(event: MatCheckboxChange) {
    this.saveAddress = event.checked;
  }

  async getConfirmationToken(){
    try{
      if(Object.values(this.completionState()).every(state => state===true)){
        const result = await this.stripeService.createConfirmationToken();
        if(result.error){
          throw new Error(result.error.message);
        }
        this.confirmationToken = result.confirmationToken;
      }
    }catch(error:any){
      this.snackBar.error(error.message);
    }
  }

  async onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      if (this.saveAddress) {
        const address = await this.getAddressFromStripe();
        address && firstValueFrom(this.accountService.updateAddress(address));
      }
    }
    if (event.selectedIndex === 2) {
      await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
    }
    if (event.selectedIndex === 3) {
      await this.getConfirmationToken();
    }
  }

  async onConfirmPayment(stepper:MatStepper){
    this.isLoading = true;
    try {
      if(this.confirmationToken){
        const result = await this.stripeService.confirmPayment(this.confirmationToken);
        if(result.error){
          throw new Error(result.error.message);
        }else{
          this.cartService.deleteCart();
          this.cartService.cart.set(null);
          this.cartService.selectedDeliveryMethod.set(null);
          this.router.navigate(['/checkout/success']);
        }
      }
    } catch (error:any) {
      this.snackBar.error(error.message);
      stepper.previous();
    }finally{
      this.isLoading = false;
    }
  }

  private async getAddressFromStripe(): Promise<Address | null> {
    const result = await this.addressElement?.getValue();
    const address = result?.value.address;
    if (address) {
      return {
        line1: address?.line1,
        line2: address?.line2 || undefined,
        city: address?.city,
        state: address?.state,
        postalCode: address?.postal_code,
        country: address?.country
      }
    }
    return null;
  }
  ngOnDestroy(): void {
    this.stripeService.disposeElements();
  }
}

