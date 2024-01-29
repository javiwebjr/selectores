import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { CountryRoutingModule } from './country-routing.module';



@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule
  ]
})
export class CountryModule { }
