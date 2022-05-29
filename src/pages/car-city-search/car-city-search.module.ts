import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarCitySearchPage } from './car-city-search';

@NgModule({
  declarations: [
    CarCitySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CarCitySearchPage),
  ],
})
export class CarCitySearchPageModule {}
