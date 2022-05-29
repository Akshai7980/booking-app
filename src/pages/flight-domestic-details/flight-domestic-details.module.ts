import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightDomesticDetailsPage } from './flight-domestic-details';

@NgModule({
  declarations: [
    FlightDomesticDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightDomesticDetailsPage),
  ],
})
export class FlightDomesticDetailsPageModule {}
