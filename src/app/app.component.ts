import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'stripePayment';
  toggleForm: boolean = false;


  ontoggleForm(event) {
    this.toggleForm = event.target.checked;
  }
}
