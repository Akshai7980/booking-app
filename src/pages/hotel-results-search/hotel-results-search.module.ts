import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelResultsSearchPage } from './hotel-results-search';
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    HotelResultsSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelResultsSearchPage),
    Ionic2RatingModule
  ],
})
export class HotelResultsSearchPageModule {}
