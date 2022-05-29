import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightSearchResultsPage } from './flight-search-results';
import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    FlightSearchResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightSearchResultsPage),
    PipesModule
  ],
})
export class FlightSearchResultsPageModule {}
