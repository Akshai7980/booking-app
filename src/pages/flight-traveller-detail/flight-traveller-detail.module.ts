import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightTravellerDetailPage } from './flight-traveller-detail';

@NgModule({
  declarations: [
    FlightTravellerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightTravellerDetailPage),
  ],
})
export class FlightTravellerDetailPageModule {}
