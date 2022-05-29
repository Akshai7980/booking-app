import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightSearchMultiWayResultsPage } from './flight-search-multi-way-results';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    FlightSearchMultiWayResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightSearchMultiWayResultsPage),
    PipesModule

  ],
})
export class FlightSearchMultiWayResultsPageModule {}
