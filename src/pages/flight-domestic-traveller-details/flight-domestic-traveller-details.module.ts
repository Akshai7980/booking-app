import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightDomesticTravellerDetailsPage } from './flight-domestic-traveller-details';

@NgModule({
  declarations: [
    FlightDomesticTravellerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightDomesticTravellerDetailsPage),
  ],
})
export class FlightDomesticTravellerDetailsPageModule {}
