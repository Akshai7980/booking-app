import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightFightDetailPage } from './flight-fight-detail';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    FlightFightDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightFightDetailPage),
    Ionic2RatingModule
  ],
})
export class FlightFightDetailPageModule {}
