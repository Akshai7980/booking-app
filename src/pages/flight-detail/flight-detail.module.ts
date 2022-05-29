import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightDetailPage } from './flight-detail';

@NgModule({
  declarations: [
    FlightDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightDetailPage),
  ],
})
export class FlightDetailPageModule {}
