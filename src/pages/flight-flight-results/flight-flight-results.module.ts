import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightFlightResultsPage } from './flight-flight-results';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    FlightFlightResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightFlightResultsPage),
    PipesModule
  ],
})
export class FlightFlightResultsPageModule {}
