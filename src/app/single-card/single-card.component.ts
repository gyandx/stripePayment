import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

declare var Stripe;

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent implements OnInit, AfterViewInit {

  cardErrors: any;
  stripe: any;
  card: any;
  paymentLoading: boolean = false;
  showCardError: boolean = false;

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

    this.card = elements.create('card');
    this.card.mount('#cardInfo');
    this.card.on('change', (error) => {
      if (error.error === undefined || error) {
        if (error.error !== undefined) {
          this.showCardError = true;
          this.cardErrors = error.error.message;
        } else {
          this.showCardError = false;
        }
      }
    });
  }

  async submitPayment(form: NgForm): Promise<any> {
    this.paymentLoading = true;

    const { token, error } = await this.stripe.createToken(this.card, {
      name: form.value.name
    });
    if (token) {
      form.reset();
      this.card.clear();
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
