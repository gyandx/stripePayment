import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SingleCardComponent } from './single-card/single-card.component';
import { MultipleCardComponent } from './multiple-card/multiple-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleCardComponent,
    MultipleCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
