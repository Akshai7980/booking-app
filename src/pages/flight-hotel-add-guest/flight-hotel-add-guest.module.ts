import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightHotelAddGuestPage } from './flight-hotel-add-guest';

@NgModule({
  declarations: [
    FlightHotelAddGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightHotelAddGuestPage),
  ],
})
export class FlightHotelAddGuestPageModule {}
