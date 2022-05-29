import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightHotelTravellerDetailPage } from './flight-hotel-traveller-detail';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    FlightHotelTravellerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightHotelTravellerDetailPage),
    Ionic2RatingModule
  ],
})
export class FlightHotelTravellerDetailPageModule {}
