import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightAddTravellerPage } from './flight-add-traveller';

@NgModule({
  declarations: [
    FlightAddTravellerPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightAddTravellerPage),
  ],
})
export class FlightAddTravellerPageModule {}
