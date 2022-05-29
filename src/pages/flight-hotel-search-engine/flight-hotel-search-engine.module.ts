import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightHotelSearchEnginePage } from './flight-hotel-search-engine';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    FlightHotelSearchEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(FlightHotelSearchEnginePage),
    DirectivesModule
  ],
})
export class FlightHotelSearchEnginePageModule {}
