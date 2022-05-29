import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightDetailTwoWayPage } from './flight-detail-two-way';

@NgModule({
  declarations: [
    FlightDetailTwoWayPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightDetailTwoWayPage),
  ],
})
export class FlightDetailTwoWayPageModule {}
