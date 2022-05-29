import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightHotelReviewPage } from './flight-hotel-review';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    FlightHotelReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightHotelReviewPage),
    Ionic2RatingModule
  ],
})
export class FlightHotelReviewPageModule {}
