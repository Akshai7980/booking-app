import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelReviewPage } from './hotel-review';
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    HotelReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelReviewPage),
    Ionic2RatingModule
  ],
})
export class HotelReviewPageModule {}
