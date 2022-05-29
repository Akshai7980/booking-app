import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightDetailMultiWayPage } from './flight-detail-multi-way';

@NgModule({
  declarations: [
    FlightDetailMultiWayPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightDetailMultiWayPage),
  ],
})
export class FlightDetailMultiWayPageModule {}
