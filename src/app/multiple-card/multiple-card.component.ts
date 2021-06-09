import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

declare var Stripe;

@Component({
  selector: 'app-multiple-card',
  templateUrl: './multiple-card.component.html',
  styleUrls: ['./multiple-card.component.css']
})
export class MultipleCardComponent implements OnInit, AfterViewInit {

  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  showCardError: boolean = false;
  paymentLoading: boolean = false;
  toggleForm: boolean = false;
  toggleCardNumberError: boolean = false;
  toggleCardMonthError: boolean = false;
  toggleCardCvvError: boolean = false;
  cardNumberError: string;
  cardCvvError: string;
  cardMonthError: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const cardStyle = {
      base: {
        iconColor: '#1586ad',
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: 'rgba(190, 193, 197, 0.9)',
          fontSize: '0.9em',
          fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif'
        },
      },
      invalid: {
        color: 'red',
        iconColor: '#fa755a',
      },
    };

    this.stripe = Stripe(environment.stripeTestKey);
    const elements = this.stripe.elements();


    this.cardNumber = elements.create('cardNumber', { showIcon: true, placeholder: 'Enter your card number', style: cardStyle });
    this.cardNumber.mount('#cc-number');
    this.cardNumber.on('change', (error) => {
      if (error.error === undefined || error) {
        if (error.error !== undefined) {
          this.toggleCardNumberError = true;
          this.cardNumberError = error.error.message;
        } else {
          this.toggleCardNumberError = false;
        }
      }
    });

    this.cardExpiry = elements.create('cardExpiry', { placeholder: 'MM / YY', style: cardStyle });
    this.cardExpiry.mount('#cc-exp-date');
    this.cardExpiry.on('change', (error) => {
      if (error.error === undefined || error) {
        // const displayError = document.getElementById('ccNum');
        if (error.error !== undefined) {
          this.toggleCardMonthError = true;
          this.cardMonthError = error.error.message;
        } else {
          this.toggleCardMonthError = false;
        }
      }
    });

    this.cardCvc = elements.create('cardCvc', { placeholder: 'Enter CVC', style: cardStyle });
    this.cardCvc.mount('#cc-cvc');
    this.cardCvc.on('change', (error) => {
      if (error.error === undefined || error) {
        // const displayError = document.getElementById('ccNum');
        if (error.error !== undefined) {
          this.toggleCardCvvError = true;
          this.cardCvvError = error.error.message;
        } else {
          this.toggleCardCvvError = false;
        }
      }
    });

  }

  async submitPayment(form: NgForm): Promise<any> {
    this.paymentLoading = true;


    const { token, error } = await this.stripe.createToken(this.cardNumber, {
      name: form.value.name
    });
    if (token) {
      form.reset();
      this.cardNumber.clear();
      this.cardExpiry.clear();
      this.cardCvc.clear();
      this.onSuccess(token);
    } else {
      this.onError(error);
    }

  }

  // function to call payment if token is generated
  onSuccess(token): void {
    this.paymentLoading = false;
    alert('Your payment successful and payment id:- ' + token?.id);
  }

  // function to show error if token is not generated
  onError(error): void {
    this.paymentLoading = false;
    if (error.message) {
      alert(error.message);
    }
  }

}
