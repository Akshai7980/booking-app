import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightTransferResultsPage } from './flight-transfer-results';

@NgModule({
  declarations: [
    FlightTransferResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightTransferResultsPage),
  ],
})
export class FlightTransferResultsPageModule {}
