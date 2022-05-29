import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightHotelDetailsPage } from './flight-hotel-details';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    FlightHotelDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightHotelDetailsPage),
    Ionic2RatingModule,
    ComponentsModule,
    DirectivesModule
  ],
})
export class FlightHotelDetailsPageModule {}
