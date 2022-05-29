import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightAirportSearchPage } from './flight-airport-search';

@NgModule({
  declarations: [
    FlightAirportSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightAirportSearchPage),
  ],
})
export class FlightAirportSearchPageModule {}
