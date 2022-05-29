import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightSearchTwoWayResultsPage } from './flight-search-two-way-results';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    FlightSearchTwoWayResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightSearchTwoWayResultsPage),
    PipesModule
  ],
})
export class FlightSearchTwoWayResultsPageModule {}
