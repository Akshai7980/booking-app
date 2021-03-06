import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightHotelResultsPage } from './flight-hotel-results';
import { Ionic2RatingModule } from 'ionic2-rating';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    FlightHotelResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightHotelResultsPage),
    Ionic2RatingModule,
    PipesModule
  ],
})
export class FlightHotelResultsPageModule {}
