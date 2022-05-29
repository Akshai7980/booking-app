import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightSearchEnginePage } from './flight-search-engine';
import { DirectivesModule } from '../../directives/directives.module';
import { CalendarModule } from 'ion2-calendar';


@NgModule({
  declarations: [
    FlightSearchEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(FlightSearchEnginePage),
    DirectivesModule,
    CalendarModule
  ],
})
export class FlightSearchEnginePageModule {}
