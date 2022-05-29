import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelCitySearchPage } from './hotel-city-search';

@NgModule({
  declarations: [
    HotelCitySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelCitySearchPage),
  ],
})
export class HotelCitySearchPageModule {}
